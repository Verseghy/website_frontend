import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ALERTMESSAGE_FEATURE_KEY, State, AlertMessagePartialState } from './alert-message.reducer'
import { AlertMessagePriority } from '../../models/alert-message'

export const getAlertMessageState = createFeatureSelector<AlertMessagePartialState, State>(ALERTMESSAGE_FEATURE_KEY)

export const getAlertMessageLoaded = createSelector(getAlertMessageState, (state: State) => state.loaded)

export const getAlertMessageError = createSelector(getAlertMessageState, (state: State) => state.error)

export const getAlertMessages = createSelector(getAlertMessageState, (state: State) =>
  state.alertMessages.slice().sort((a, b) => {
    const priorities = [AlertMessagePriority.HIGH, AlertMessagePriority.MEDIUM, AlertMessagePriority.LOW]
    return priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
  }))