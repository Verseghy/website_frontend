import { Action, createReducer, on } from '@ngrx/store'
import * as CompetitionsActions from './competitions.actions'
import { Competition } from '../../models/competition'

export const COMPETITIONS_FEATURE_KEY = 'competitions'

export interface State {
  selectedID?: number
  loaded: boolean
  error?: string | null
  competitions: Competition[],
  entities: {
    [id: number]: Competition
  }
}

export interface CompetitionsPartialState {
  readonly [COMPETITIONS_FEATURE_KEY]: State
}

export const initialState: State = {
  loaded: false,
  competitions: [],
  entities: {}
}

const competitionsReducer = createReducer(
  initialState,
  on(CompetitionsActions.loadRecentCompetitions, (state) => ({ ...state, loaded: false, error: null })),
  on(CompetitionsActions.loadCompetitionsSuccess, (state, { competitions }) => ({
    ...state, competitions, loaded: true, error: null,
    entities: competitions.reduce((acc, curr) => {
      acc[curr.id] = curr
      return acc
    }, {})
  })),
  on(CompetitionsActions.loadCompetitionsFailure, (state, { error }) => ({ ...state, error })),
  on(CompetitionsActions.selectCompetition, (state, { selectedID }) => ({ ...state, selectedID })),
)

export function reducer(state: State | undefined, action: Action) {
  return competitionsReducer(state, action)
}
