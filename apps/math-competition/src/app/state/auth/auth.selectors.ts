import { authKey } from './auth.reducer'
import { createSelector } from '@ngrx/store'

const selectState = (state) => state[authKey]

export const selectLoginError = createSelector(selectState, (state) => state.loginError)

export const selectLoading = createSelector(selectState, (state) => state.loading)

export const selectUID = createSelector(selectState, (state) => state.uid)
