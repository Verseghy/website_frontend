import { Action, createReducer, on } from '@ngrx/store'
import { authenticated, initAuth, login, loginError, notAuthenticated } from './auth.actions'

export const authKey = 'auth'

export interface State {
  uid: string
  loading: boolean
  loginError: any
}

const initialState: State = {
  uid: '',
  loading: true,
  loginError: {}
}

const authReducer = createReducer(
  initialState,

  on(initAuth, state => state),

  on(authenticated, (state, {uid}) => ({...state, uid: uid, loading: false})),
  on(notAuthenticated, state => ({...state, uid: '', loading: false})),

  on(login, state => ({...state, loading: true, loginError: ''})),
  on(loginError, (state, {error}) => ({...state, loading: false, loginError: error}))
)

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action)
}
