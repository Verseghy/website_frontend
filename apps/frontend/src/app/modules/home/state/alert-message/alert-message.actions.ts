import { createAction, props } from '@ngrx/store'
import { AlertMessage } from '../../models/alert-message'

export const loadAlertMessage = createAction('[home] Load AlertMessage')

export const loadAlertMessageSuccess = createAction('[home] Load AlertMessage Success', props<{ alertMessages: AlertMessage[] }>())

export const loadAlertMessageFailure = createAction('[home] Load AlertMessage Failure', props<{ error: any }>())
