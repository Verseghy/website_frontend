import { Action, createReducer, on } from '@ngrx/store'

import * as SearchActions from './search.actions'
import { Post } from '../../../../models/Post'

export const SEARCH_FEATURE_KEY = 'search'

export interface State {
  posts: Post[]
  loaded: boolean
  error?: string | null
}

export interface SearchPartialState {
  readonly [SEARCH_FEATURE_KEY]: State
}

export const initialState: State = {
  posts: [],
  loaded: false,
}

const searchReducer = createReducer(
  initialState,
  on(SearchActions.queryTerm, (state) => ({ ...state, loaded: false, error: null, posts: [] })),
  on(SearchActions.queryLabel, (state) => ({ ...state, loaded: false, error: null, posts: [] })),
  on(SearchActions.queryAuthor, (state) => ({ ...state, loaded: false, error: null, posts: [] })),
  on(SearchActions.loadSearchSuccess, (state, { posts }) => ({ ...state, posts, loaded: true, error: null })),
  on(SearchActions.loadSearchFailure, (state, { error }) => ({ ...state, error }))
)

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action)
}
