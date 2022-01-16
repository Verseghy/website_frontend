import { COLLEAGUES_FEATURE_KEY, ColleaguesState } from './colleagues.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectState = createFeatureSelector<ColleaguesState>(COLLEAGUES_FEATURE_KEY)

export const selectVisible = createSelector(selectState, (state) => {
  for (const visible of state.visibleCategories.entries()) {
    if (visible[1]) {
      return visible[0]
    }
  }
  return -1
})
