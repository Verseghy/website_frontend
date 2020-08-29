import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as fromCompetitions from './competitions.reducer'
import * as CompetitionsSelectors from './competitions.selectors'
import { loadRecentCompetitions, selectCompetition } from './competitions.actions'

@Injectable()
export class CompetitionsFacade {
  loaded$ = this.store.pipe(select(CompetitionsSelectors.getCompetitionsLoaded))
  error$ = this.store.pipe(select(CompetitionsSelectors.getCompetitionsError))
  competitions$ = this.store.pipe(select(CompetitionsSelectors.getCompetitions))
  selectedCompetition$ = this.store.pipe(select(CompetitionsSelectors.getSelected))

  constructor(private store: Store<fromCompetitions.CompetitionsPartialState>) {}

  queryRecentCompetitions() {
    this.store.dispatch(loadRecentCompetitions())
  }

  selectCompetition(selectedID: number) {
    this.store.dispatch(selectCompetition({ selectedID }))
  }
}
