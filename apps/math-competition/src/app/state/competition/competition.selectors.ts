import { competitionFeatureKey, State } from './competition.reducer'
import { createSelector } from '@ngrx/store'

const selectCompetition = state => state[competitionFeatureKey]

export const selectProblems = createSelector(
  selectCompetition,
  (competition: State) => competition.problems.sort((a, b) => a.id - b.id)
)
