import { createAction, props } from '@ngrx/store'

export const noop = createAction('[auth] noop')

export const initAuth = createAction('[auth] init')

export const authenticated = createAction('[auth] authenticated', props<{ uid: string }>())
export const notAuthenticated = createAction('[auth] not authenticated')

export const login = createAction('[auth] login', props<{ email: string; password: string }>())
export const loginError = createAction('[auth] login error', props<{ error: any }>())

export const logout = createAction('[auth] logout')
export const register = () => {}
