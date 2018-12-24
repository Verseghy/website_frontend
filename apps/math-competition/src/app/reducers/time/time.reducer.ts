import * as timeActions from './time.actions'

export interface Time {
  timestate: TimeState
  loading: boolean
}

export enum TimeState {
  BEFORE,
  DURING,
  AFTER,
}

export type Action = timeActions.TimeActions

export function timeReducer(
  state: Time = {
    timestate: TimeState.BEFORE,
    loading: true,
  },
  action: Action
) {
  switch (action.type) {
    case timeActions.BEFORE:
      return { ...state, timestate: TimeState.BEFORE, loading: false }

    case timeActions.DURING:
      return { ...state, timestate: TimeState.DURING, loading: false }

    case timeActions.AFTER:
      return { ...state, timestate: TimeState.AFTER, loading: false }

    default:
      return state
  }
}
