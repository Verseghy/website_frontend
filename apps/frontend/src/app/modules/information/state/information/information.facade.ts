import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { InformationPartialState } from './information.reducer'
import { selectError, selectLoadedMenu, selectLoadedPage, selectMenuItems, selectPage } from './information.selectors'
import { queryMenuItems, queryPage } from './information.actions'

@Injectable({
  providedIn: 'root',
})
export class InformationFacade {
  loadedMenu$ = this.store$.pipe(select(selectLoadedMenu))
  loadedPage$ = this.store$.pipe(select(selectLoadedPage))
  error$ = this.store$.pipe(select(selectError))
  menu$ = this.store$.pipe(select(selectMenuItems))
  page$ = this.store$.pipe(select(selectPage))

  constructor(private store$: Store<InformationPartialState>) {}

  queryMenu(): void {
    this.store$.dispatch(queryMenuItems())
  }

  queryPageBySlug(slug: string): void {
    this.store$.dispatch(queryPage({ slug }))
  }
}
