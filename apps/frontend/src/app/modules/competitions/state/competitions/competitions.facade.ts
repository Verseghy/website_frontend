import { Injectable } from '@angular/core'

import { Action, select, Store } from '@ngrx/store'

import * as fromCompetitions from './competitions.reducer'
import * as CompetitionsSelectors from './competitions.selectors'

@Injectable()
export class CompetitionsFacade {
  loaded$ = this.store.pipe(select(CompetitionsSelectors.getCompetitionsLoaded))
  allCompetitions$ = this.store.pipe(select(CompetitionsSelectors.getAllCompetitions))
  selectedCompetitions$ = this.store.pipe(select(CompetitionsSelectors.getSelected))

  constructor(private store: Store<fromCompetitions.CompetitionsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action)
  }
}
