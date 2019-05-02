import { Action } from '@ngrx/store'
import { Entity } from './popup.reducer'

export enum PopupActionTypes {
  LoadPopup = '[Popup] Load Popup',
  PopupLoaded = '[Popup] Popup Loaded',
  PopupLoadError = '[Popup] Popup Load Error',
}

export class LoadPopup implements Action {
  readonly type = PopupActionTypes.LoadPopup
}

export class PopupLoadError implements Action {
  readonly type = PopupActionTypes.PopupLoadError
  constructor(public payload: any) {}
}

export class PopupLoaded implements Action {
  readonly type = PopupActionTypes.PopupLoaded
  constructor(public payload: Entity[]) {}
}

export type PopupAction = LoadPopup | PopupLoaded | PopupLoadError

export const fromPopupActions = {
  LoadPopup,
  PopupLoaded,
  PopupLoadError,
}
