import { Action } from '@ngrx/store'
import { PopupSettings } from '../calendar.interfaces';

export enum PopupActionTypes {
  HideMoreEventsPopup = '[Popup] Hide More Events Popup',
  SetMoreEventsPopup = '[Popup] Set More Events Popup',
}

export class HideMoreEventsPopup implements Action {
  readonly type = PopupActionTypes.HideMoreEventsPopup
}

export class SetMoreEventsPopup implements Action {
  readonly type = PopupActionTypes.SetMoreEventsPopup
  constructor(public payload: PopupSettings) {}
}

export const fromPopupActions = {
  HideMoreEventsPopup,
  SetMoreEventsPopup
}

export type PopupAction
  = HideMoreEventsPopup
  | SetMoreEventsPopup