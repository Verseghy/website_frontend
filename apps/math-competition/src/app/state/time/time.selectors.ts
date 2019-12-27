import { createSelector } from '@ngrx/store'
import { State, timeFeatureKey } from './time.reducer'

const selectTime = state => state[timeFeatureKey]

export const selectStartTime = createSelector(
  selectTime,
  (state: State) => state.startTime
)

export const selectEndTime = createSelector(
  selectTime,
  (state: State) => state.endTime
)
