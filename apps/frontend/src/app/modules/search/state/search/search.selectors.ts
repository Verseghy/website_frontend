import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SEARCH_FEATURE_KEY, SearchPartialState, State } from './search.reducer'

// Lookup the 'Search' feature state managed by NgRx
export const getSearchState = createFeatureSelector<State>(SEARCH_FEATURE_KEY)

export const getSearchLoaded = createSelector(getSearchState, (state: State) => state.loaded)

export const getSearchError = createSelector(getSearchState, (state: State) => state.error)

export const getSearchPosts = createSelector(getSearchState, (state: State) => state.posts)
