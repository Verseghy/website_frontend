import { PopupAction, PopupActionTypes } from './popup.actions'
import { PopupSettings } from '../calendar.interfaces'

export const POPUP_FEATURE_KEY = 'ui-calendar-popup'

export interface PopupState {
  moreEventsPopup: PopupSettings
}

export interface PopupPartialState {
  readonly [POPUP_FEATURE_KEY]: PopupState
}

export const initialState: PopupState = {
  moreEventsPopup: {
    visible: false,
    top: 0,
    left: 0,
    date: '',
    events: [],
  },
}

export function popupReducer(state: PopupState = initialState, action: PopupAction): PopupState {
  switch (action.type) {
    case PopupActionTypes.HideMoreEventsPopup: {
      state = {
        ...state,
        moreEventsPopup: {
          ...state.moreEventsPopup,
          visible: false,
        },
      }
      break
    }

    case PopupActionTypes.SetMoreEventsPopup: {
      state = {
        ...state,
        moreEventsPopup: {
          ...state.moreEventsPopup,
          ...action.payload,
        },
      }
      break
    }
  }
  return state
}
