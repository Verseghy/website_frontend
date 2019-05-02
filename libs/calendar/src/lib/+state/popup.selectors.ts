import { createFeatureSelector, createSelector } from '@ngrx/store'
import { POPUP_FEATURE_KEY, PopupState } from './popup.reducer'

// Lookup the 'Popup' feature state managed by NgRx
const getPopupState = createFeatureSelector<PopupState>(POPUP_FEATURE_KEY)

const getLoaded = createSelector(
  getPopupState,
  (state: PopupState) => state.loaded
)
const getError = createSelector(
  getPopupState,
  (state: PopupState) => state.error
)

const getAllPopup = createSelector(
  getPopupState,
  getLoaded,
  (state: PopupState, isLoaded) => {
    return isLoaded ? state.list : []
  }
)
const getSelectedId = createSelector(
  getPopupState,
  (state: PopupState) => state.selectedId
)
const getSelectedPopup = createSelector(
  getAllPopup,
  getSelectedId,
  (popup, id) => {
    const result = popup.find(it => it['id'] === id)
    return result ? Object.assign({}, result) : undefined
  }
)

export const popupQuery = {
  getLoaded,
  getError,
  getAllPopup,
  getSelectedPopup,
}
