import { Action } from '@ngrx/store'

export const GET_USER = '[Auth] Get user'
export const AUTHENTICATED = '[Auth] Authenticated'
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated'

export const LOGIN = '[Auth] Login attempt'
export const LOGOUT = '[Auth] Logout'

export const AUTH_ERROR = '[Auth] Error'

export class GetUser implements Action {
  readonly type = GET_USER
  constructor(public payload?: any) {}
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED
  constructor(public payload?: any) {}
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR
  constructor(public payload?: any) {}
}

export class Login implements Action {
  readonly type = LOGIN
  constructor(public payload?: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT
  constructor(public payload?: any) {}
}

export type AuthActions = GetUser | Authenticated | NotAuthenticated | Login | AuthError | Logout
