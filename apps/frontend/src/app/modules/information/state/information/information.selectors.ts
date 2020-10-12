import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromInformation from './information.reducer'

export const selectInformationState = createFeatureSelector<fromInformation.State>(fromInformation.informationFeatureKey)

export const selectLoadedMenu = createSelector(selectInformationState, (state) => state.loadedMenu)

export const selectLoadedPage = createSelector(selectInformationState, (state) => state.loadedPage)

export const selectError = createSelector(selectInformationState, (state) => state.error)

export const selectMenuItems = createSelector(selectInformationState, (state) => state.menuItems)

export const selectPage = createSelector(selectInformationState, (state) => state.page)
