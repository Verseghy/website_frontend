import { COLLEAGUES_FEATURE_KEY, ColleaguesState } from './colleagues.reducer'
import { createSelector } from '@ngrx/store'

const selectState = (state: any) => {
  return state[COLLEAGUES_FEATURE_KEY]
}

export const selectVisible = createSelector(selectState, (state: ColleaguesState) => {
  for (const visible of state.visibleCategories.entries()) {
    if (visible[1]) {
      return visible[0]
    }
  }
  return -1
})
