import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { fromEvent, interval, Subscription } from 'rxjs'
import { debounce } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import { ColleaguesState } from '../../reducer/colleagues/colleagues.reducer'
import { LoadColleagues } from '../../reducer/colleagues/colleagues.actions'

@Component({
  selector: 'verseghy-colleagues',
  templateUrl: './colleagues.component.html',
  styleUrls: ['./colleagues.component.css'],
})
export class ColleaguesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('header') header: QueryList<ElementRef>
  currentScrollPosition: number | null
  private _scrollSubscriber: Subscription
  private _visibleCards: Array<boolean> = []

  constructor(private store: Store<ColleaguesState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadColleagues())
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._scrollSubscriber = fromEvent(window, 'scroll')
        .pipe(debounce(() => interval(50)))
        .subscribe(() => {
          this._scrollHandler()
        })
      this._scrollHandler()
    })
  }

  ngOnDestroy() {
    this._scrollSubscriber.unsubscribe()
  }

  clickHandler(n: number): void {
    window.scrollTo(0, this.header.toArray()[n].nativeElement.getBoundingClientRect().top + window.scrollY)
  }

  private _scrollHandler(): void {
    this.header.forEach((item, index) => {
      const rect = item.nativeElement.getBoundingClientRect()
      this._visibleCards[index] = rect.top < window.innerHeight && rect.bottom >= 0
    })

    this.currentScrollPosition = this._findFirstTrue(this._visibleCards)
  }

  private _findFirstTrue(array: Array<boolean>): number | null {
    for (const index of Object.keys(array)) {
      if (array[index]) {
        return Number(index)
      }
    }
    return null
  }
}
