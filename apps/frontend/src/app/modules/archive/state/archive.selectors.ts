import { archiveFeatureKey } from './archive.reducer'
import { createSelector } from '@ngrx/store'

const selectState = (state) => state[archiveFeatureKey]

export const selectArchives = createSelector(selectState, (state) => state.archives)

export const selectArchivesList = createSelector(selectState, (state) => state.archivesList)

export const selectError = createSelector(selectState, (state) => state.error)

export const selectLoading = createSelector(selectState, (state) => state.loading)
