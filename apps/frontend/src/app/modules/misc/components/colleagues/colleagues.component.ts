import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { select, Store } from '@ngrx/store'
import { COLLEAGUES_FEATURE_KEY, ColleaguesState, Entity } from '../../reducer/colleagues/colleagues.reducer'
import { fromColleaguesActions, LoadColleagues } from '../../reducer/colleagues/colleagues.actions'
import { selectVisible } from '../../reducer/colleagues/colleagues.selectors'

@Component({
  selector: 'verseghy-colleagues',
  templateUrl: './colleagues.component.html',
  styleUrls: ['./colleagues.component.scss'],
})
export class ColleaguesComponent implements OnInit {
  categories: string[] = [
    'Vezetőség',
    'Tanárok',
    'Óraadók',
    'Gazdasági-, adminisztratív- és technikai dolgozóink',
    'Konyhai dolgozók',
    'Takarítók',
    'Karbantartók',
  ]
  colleagues: Observable<Entity[][]>

  visible = this.store.pipe(select(selectVisible))

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

  setVisible(number: number, boolean: boolean) {
    this.store.dispatch(new fromColleaguesActions.CategoryInViewport([number, boolean]))
  }
}
