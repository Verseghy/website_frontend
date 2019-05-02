import { Action } from '@ngrx/store'
import { PopupSettings } from '../calendar.interfaces';

export enum PopupActionTypes {
  HideEventDetailsPopup = '[Popup] Hide Event Details Popup ',
  SetEventDetailsPopup = '[Popup] Set Event Details Popup',
  HideMoreEventsPopup = '[Popup] Hide More Events Popup',
  SetMoreEventsPopup = '[Popup] Set More Events Popup',
}

export class HideEventDetailsPopup implements Action {
  readonly type = PopupActionTypes.HideEventDetailsPopup
}

export class SetEventDetailsPopup implements Action {
  readonly type = PopupActionTypes.SetEventDetailsPopup
  constructor(public payload: PopupSettings) {}
}

export class HideMoreEventsPopup implements Action {
  readonly type = PopupActionTypes.HideMoreEventsPopup
}

export class SetMoreEventsPopup implements Action {
  readonly type = PopupActionTypes.SetMoreEventsPopup
  constructor(public payload: PopupSettings) {}
}

export const fromPopupActions = {
  HideEventDetailsPopup,
  SetEventDetailsPopup,
  HideMoreEventsPopup,
  SetMoreEventsPopup
}

export type PopupAction
  = HideEventDetailsPopup
  | SetEventDetailsPopup
  | HideMoreEventsPopup
  | SetMoreEventsPopup