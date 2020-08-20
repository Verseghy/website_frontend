import { createFeatureSelector, createSelector } from '@ngrx/store'
import { COMPETITIONS_FEATURE_KEY, competitionsAdapter, CompetitionsPartialState, State } from './competitions.reducer'

// Lookup the 'Competitions' feature state managed by NgRx
export const getCompetitionsState = createFeatureSelector<CompetitionsPartialState, State>(COMPETITIONS_FEATURE_KEY)

const { selectAll, selectEntities } = competitionsAdapter.getSelectors()

export const getCompetitionsLoaded = createSelector(getCompetitionsState, (state: State) => state.loaded)

export const getCompetitionsError = createSelector(getCompetitionsState, (state: State) => state.error)

export const getAllCompetitions = createSelector(getCompetitionsState, (state: State) => selectAll(state))

export const getCompetitionsEntities = createSelector(getCompetitionsState, (state: State) => selectEntities(state))

export const getSelectedId = createSelector(getCompetitionsState, (state: State) => state.selectedId)

export const getSelected = createSelector(
  getCompetitionsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
)
