import * as authActions from './auth.actions'

export interface User {
  uid: string
  loading?: boolean
  error?: string
}

export type Action = authActions.AuthActions

export function authReducer(state: User, action: Action) {
  switch (action.type) {
    case authActions.GET_USER:
      return { ...state, loading: true }

    case authActions.AUTHENTICATED:
      return { ...state, ...action.payload, loading: false }

    case authActions.NOT_AUTHENTICATED:
      return { ...state, loading: false }

    case authActions.LOGIN:
      return { ...state, loading: true }

    case authActions.AUTH_ERROR:
      return { ...state, ...action.payload, loading: false }

    case authActions.LOGOUT:
      return { ...state, loading: true }
  }
}
