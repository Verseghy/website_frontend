import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, concat, interval, timer } from 'rxjs'
import { filter, first, map, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { PostsFacade } from '../../state/posts/posts.facade'
import { animate, style, transition, trigger } from '@angular/animations'
import { format } from 'date-fns'

@Component({
  selector: 'verseghy-featured-post',
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.scss'],
  animations: [
    trigger('animate', [
      transition(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0,
        }),
        animate(
          '200ms',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms',
          style({
            opacity: 0,
          })
        ),
      ]),

      /*,transition('left => void', [
        animate(
          '300ms',
          style({
            transform: 'translate3d(calc(-100% - 10px), 0, 0)',
            opacity: 0,
          })
        ),
      ]),
      transition('void => left', [
        style({
          transform: 'translate3d(calc(100% + 10px), 0, 0)',
          opacity: 0,
        }),
        animate(
          '300ms',
          style({
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          })
        ),
      ]),
      transition('right => void', [
        animate(
          '300ms',
          style({
            transform: 'translate3d(calc(100% + 10px), 0, 0)',
            opacity: 0,
          })
        ),
      ]),
      transition('void => right', [
        style({
          transform: 'translate3d(calc(-100% - 10px), 0, 0)',
          opacity: 0,
        }),
        animate(
          '300ms',
          style({
            transform: 'translate3d(0, 0, 0)',
            opacity: 1,
          })
        ),
      ]),*/
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedPostComponent implements OnDestroy, OnInit {
  private subs = new SubSink()

  autoplaySpeed = 1000
  isHovered = false
  page$ = new BehaviorSubject(0)
  posts$ = combineLatest([this.postsFacade.featuredPosts$, this.page$]).pipe(
    map(([posts, page]) => {
      // @ts-ignore TODO(zoltanszepesi): check this again after updating typescript
      this.page = ((page % posts.length) + posts.length) % posts.length
      // @ts-ignore TODO(zoltanszepesi): check this again after updating typescript
      if (posts.length) return [posts[this.page]]
      return []
    })
  )
  page = 0
  animate = ''

  featuredPosts$ = this.postsFacade.featuredPosts$

  constructor(private postsFacade: PostsFacade, private appRef: ApplicationRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true))
    const interval$ = timer(5 * 1000, 5 * 1000)

    // TODO(zoltanszepesi): fix this mess
    this.subs.sink = concat(appIsStable$, interval$).subscribe((val) => {
      if (val === true) return
      this.next()
      this.changeDetectorRef.detectChanges()
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  next(): void {
    this.page$.next(++this.page)
  }

  previous(): void {
    this.page$.next(--this.page)
  }

  onMouseEnter(): void {
    this.isHovered = true
  }

  onMouseLeave(): void {
    this.isHovered = false
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }

  toPage(page: number) {
    this.page = page
    this.page$.next(page)
  }

  toPageKeydown(event: KeyboardEvent, page: number) {
    if (event.code === 'Enter') {
      this.toPage(page)
    }
  }

  switchPageKeydown(event: KeyboardEvent, direction: 'next' | 'previous') {
    if (event.code !== 'Enter') return

    if (direction === 'next') return this.next()
    this.previous()
  }
}
