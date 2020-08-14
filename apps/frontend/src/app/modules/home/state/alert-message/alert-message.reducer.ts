import { createReducer, on, Action } from '@ngrx/store'

import * as AlertMessageActions from './alert-message.actions'
import { AlertMessage } from '../../models/alert-message'

export const ALERTMESSAGE_FEATURE_KEY = 'alertMessage'

export interface State {
  alertMessages: AlertMessage[]
  loaded: boolean
  error?: string | null
}

export interface AlertMessagePartialState {
  readonly [ALERTMESSAGE_FEATURE_KEY]: State
}

export const initialState: State = {
  alertMessages: [],
  loaded: false
}

const alertMessageReducer = createReducer(
  initialState,
  on(AlertMessageActions.loadAlertMessage, (state) => ({ ...state, loaded: false, error: null })),
  on(AlertMessageActions.loadAlertMessageSuccess, (state, { alertMessages }) =>
      ({ ...state, alertMessages, loaded: true, error: null })
  ),
  on(AlertMessageActions.loadAlertMessageFailure, (state, { error }) => ({ ...state, error }))
)

export function reducer(state: State | undefined, action: Action) {
  return alertMessageReducer(state, action)
}
