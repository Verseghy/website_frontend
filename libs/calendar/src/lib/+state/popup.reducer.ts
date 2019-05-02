import { PopupAction, PopupActionTypes } from './popup.actions'
import { PopupSettings } from '../calendar.interfaces';

export const POPUP_FEATURE_KEY = 'ui-calendar-popup'

export interface PopupState {
  eventDetailsPopup: PopupSettings,
  moreEventsPopup: PopupSettings
}

export interface PopupPartialState {
  readonly [POPUP_FEATURE_KEY]: PopupState
}

export const initialState: PopupState = {
  eventDetailsPopup: {
    visible: false,
    top: 0,
    left: 0,
    date: '',
    title: '',
    description: '',
    color: '',
  },
  moreEventsPopup: {
    visible: false,
    top: 0,
    left: 0,
    date: '',
    events: []
  }
}

export function popupReducer(state: PopupState = initialState, action: PopupAction): PopupState {
  switch (action.type) {
    case PopupActionTypes.HideEventDetailsPopup: {
      state = {
        ...state,
        eventDetailsPopup: {
          ...state.eventDetailsPopup,
          visible: false
        }
      }
      break
    }

    case PopupActionTypes.SetEventDetailsPopup: {
      state = {
        ...state,
        eventDetailsPopup: {
          ...state.eventDetailsPopup,
          ...action.payload
        }
      }
      break
    }

    case PopupActionTypes.HideMoreEventsPopup: {
      state = {
        ...state,
        moreEventsPopup: {
          ...state.moreEventsPopup,
          visible: false
        }
      }
      break
    }

    case PopupActionTypes.SetMoreEventsPopup: {
      state = {
        ...state,
        eventDetailsPopup: {
          ...state.moreEventsPopup,
          ...action.payload
        }
      }
      break
    }
  }
  return state
}
