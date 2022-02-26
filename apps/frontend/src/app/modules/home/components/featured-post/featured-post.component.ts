import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { animate, style, transition, trigger } from '@angular/animations'
import { format } from 'date-fns'
import {RequestService} from "../../services/request.service";

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
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedPostComponent implements OnDestroy {
  private subs = new SubSink()

  autoplaySpeed = 1000
  isHovered = false
  page$ = new BehaviorSubject(0)
  featuredPosts$ = this.requestService.listFeaturedPosts()
  posts$ = combineLatest([this.featuredPosts$, this.page$]).pipe(
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

  constructor(private requestService: RequestService) {}

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

  toPageKeyup(event: KeyboardEvent, page: number) {
    if (event.code === 'Enter') {
      this.toPage(page)
    }
  }

  switchPageKeyup(event: KeyboardEvent, direction: 'next' | 'previous') {
    if (event.code !== 'Enter') return

    if (direction === 'next') return this.next()
    this.previous()
  }
}
