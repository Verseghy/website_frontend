import { Action, createReducer, on } from '@ngrx/store'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'

import * as CompetitionsActions from './competitions.actions'
import { CompetitionsEntity } from './competitions.models'

export const COMPETITIONS_FEATURE_KEY = 'competitions'

export interface State extends EntityState<CompetitionsEntity> {
  selectedId?: string | number // which Competitions record has been selected
  loaded: boolean // has the Competitions list been loaded
  error?: string | null // last known error (if any)
}

export interface CompetitionsPartialState {
  readonly [COMPETITIONS_FEATURE_KEY]: State
}

export const competitionsAdapter: EntityAdapter<CompetitionsEntity> = createEntityAdapter<CompetitionsEntity>()

export const initialState: State = competitionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
})

const competitionsReducer = createReducer(
  initialState,
  on(CompetitionsActions.loadCompetitions, (state) => ({ ...state, loaded: false, error: null })),
  on(CompetitionsActions.loadCompetitionsSuccess, (state, { competitions }) =>
    competitionsAdapter.setAll(competitions, { ...state, loaded: true })
  ),
  on(CompetitionsActions.loadCompetitionsFailure, (state, { error }) => ({ ...state, error }))
)

export function reducer(state: State | undefined, action: Action) {
  return competitionsReducer(state, action)
}
