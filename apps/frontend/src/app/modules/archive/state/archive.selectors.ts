import { archiveFeatureKey } from './archive.reducer'
import { createSelector } from '@ngrx/store'

const selectState = (state) => state[archiveFeatureKey]

export const selectArchives = createSelector(
  selectState,
  (state) => state.archives
)
