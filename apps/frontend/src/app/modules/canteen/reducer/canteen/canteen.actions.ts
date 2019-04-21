import { Action } from '@ngrx/store'
import { Entity } from './canteen.reducer'

export enum CanteenActionTypes {
  LoadCanteen = '[Canteen] Load Canteen',
  CanteenLoaded = '[Canteen] Canteen Loaded',
  CanteenLoadError = '[Canteen] Canteen Load Error',
}

export class LoadCanteen implements Action {
  readonly type = CanteenActionTypes.LoadCanteen
}

export class CanteenLoadError implements Action {
  readonly type = CanteenActionTypes.CanteenLoadError
  constructor(public payload: any) {}
}

export class CanteenLoaded implements Action {
  readonly type = CanteenActionTypes.CanteenLoaded
  constructor(public payload: Entity[][]) {}
}

export type CanteenAction = LoadCanteen | CanteenLoaded | CanteenLoadError

export const fromCanteenActions = {
  LoadCanteen,
  CanteenLoaded,
  CanteenLoadError,
}
