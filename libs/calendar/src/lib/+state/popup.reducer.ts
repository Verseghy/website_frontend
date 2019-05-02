import { PopupAction, PopupActionTypes } from './popup.actions'

export const POPUP_FEATURE_KEY = 'popup'

/**
 * Interface for the 'Popup' data used in
 *  - PopupState, and
 *  - popupReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface PopupState {
  list: Entity[] // list of Popup; analogous to a sql normalized table
  selectedId?: string | number // which Popup record has been selected
  loaded: boolean // has the Popup list been loaded
  error?: any // last none error (if any)
}

export interface PopupPartialState {
  readonly [POPUP_FEATURE_KEY]: PopupState
}

export const initialState: PopupState = {
  list: [],
  loaded: false,
}

export function popupReducer(state: PopupState = initialState, action: PopupAction): PopupState {
  switch (action.type) {
    case PopupActionTypes.PopupLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true,
      }
      break
    }
  }
  return state
}
