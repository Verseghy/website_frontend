import { createFeatureSelector, createSelector } from '@ngrx/store'
import { COMPETITIONS_FEATURE_KEY, CompetitionsPartialState, State } from './competitions.reducer'

export const getCompetitionsState = createFeatureSelector<CompetitionsPartialState, State>(COMPETITIONS_FEATURE_KEY)

export const getCompetitionsLoaded = createSelector(getCompetitionsState, (state: State) => state.loaded)

export const getCompetitionsError = createSelector(getCompetitionsState, (state: State) => state.error)

export const getCompetitions = createSelector(getCompetitionsState, (state: State) => state.competitions)

export const getEntities = createSelector(getCompetitionsState, (state: State) => state.entities)

export const getSelectedID = createSelector(getCompetitionsState, (state: State) => state.selectedID)

export const getSelected = createSelector(getEntities, getSelectedID, (entities, selectedID) => selectedID && entities[selectedID])
