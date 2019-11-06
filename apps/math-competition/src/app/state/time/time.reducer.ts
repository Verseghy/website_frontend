import { Action, createReducer, on } from '@ngrx/store';
import * as TimeActions from './time.actions';

export const timeFeatureKey = 'time';

export interface State {
  startTime: Date
  endTime: Date
  loaded: boolean
}

export const initialState: State = {
  startTime: new Date(),
  endTime: new Date(),
  loaded: false
};

const timeReducer = createReducer(
  initialState,
  on(TimeActions.setTimes, (state, payload) => ({...state, startTime: payload.startTime.toDate(), endTime: payload.endTime.toDate(), loaded: true}))
);

export function reducer(state: State | undefined, action: Action) {
  return timeReducer(state, action);
}
