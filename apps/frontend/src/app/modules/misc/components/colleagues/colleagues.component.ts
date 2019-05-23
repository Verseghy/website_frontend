import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { fromEvent, interval, Observable, Subscription } from 'rxjs'
import { debounce, map } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { COLLEAGUES_FEATURE_KEY, ColleaguesState, Entity } from '../../reducer/colleagues/colleagues.reducer'
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
  categories: string[] = [
    'Vezetőség',
    'Tanárok',
    'Óraadók',
    'Gazdasági-, adminisztratív- és technikai dolgozóink',
    'Konyhai dolgozók',
    'Karbantartók, Takarítók',
  ]
  colleagues: Observable<Entity[][]>

  constructor(private store: Store<ColleaguesState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadColleagues())
    this.colleagues = this.store.pipe(
      select(COLLEAGUES_FEATURE_KEY),
      map((state: ColleaguesState) => {
        return state.categories
      })
    )
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
    this.header.toArray()[n].nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'})
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
