import { ActionReducerMap } from '@ngrx/store'
import { authReducer } from './auth/auth.reducer'
import { timeReducer } from './time/time.reducer'

export const reducers: ActionReducerMap<any> = {
  auth: authReducer,
  time: timeReducer,
}
