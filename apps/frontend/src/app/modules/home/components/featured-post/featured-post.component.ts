import { ApplicationRef, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { interval, BehaviorSubject, combineLatest } from 'rxjs'
import { Post } from '../../../../models/Post'
import { filter, switchMap, tap, map } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { PostsFacade } from '../../state/posts/posts.facade'
import { trigger, transition, animate, style } from '@angular/animations'
import { format } from 'date-fns'
import { ContrastService } from '../../../../services/contrast.service'

@Component({
  selector: 'verseghy-featured-post',
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.css'],
  animations: [
    trigger('animate', [
      transition('left => void', [
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
      ]),
    ]),
  ],
})
export class FeaturedPostComponent implements OnDestroy {
  private subs = new SubSink()

  autoplaySpeed = 1000
  isHovered = false
  page$ = new BehaviorSubject(0)
  post$ = combineLatest([this.postsFacade.featuredPosts$, this.page$]).pipe(
    map(([posts, page]) => [
      posts.map(post => ({
        ...post,
        labels: post.labels.map(label => ({
          ...label,
          backgroundDark: ContrastService.getConstrast(label.color),
        })),
      })),
      page,
    ]),
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

  constructor(private postsFacade: PostsFacade, private appRef: ApplicationRef) {}

  /*ngOnInit(): void {
    this.subs.add(
      this.appRef.isStable
        .pipe(
          filter(stable => stable),
          switchMap(() => interval(this.autoplaySpeed))
        )
        .subscribe(() => {
          if (!this.isHovered) {
            this.next()
          }
        })
    )
  }*/

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  next(): void {
    this.animate = 'left'
    setTimeout(() => {
      this.page$.next(++this.page)
    })
  }

  previous(): void {
    this.animate = 'right'
    setTimeout(() => {
      this.page$.next(--this.page)
    })
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
}
