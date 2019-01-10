import { Action } from '@ngrx/store'
import { Entity } from './colleagues.reducer'

export enum ColleaguesActionTypes {
  LoadColleagues = '[Colleagues] Load Colleagues',
  ColleaguesLoaded = '[Colleagues] Colleagues Loaded',
  ColleaguesLoadError = '[Colleagues] Colleagues Load Error',
}

export class LoadColleagues implements Action {
  readonly type = ColleaguesActionTypes.LoadColleagues
}

export class ColleaguesLoadError implements Action {
  readonly type = ColleaguesActionTypes.ColleaguesLoadError
  constructor(public payload: any) {}
}

export class ColleaguesLoaded implements Action {
  readonly type = ColleaguesActionTypes.ColleaguesLoaded
  constructor(public payload: Entity[]) {}
}

export type ColleaguesAction = LoadColleagues | ColleaguesLoaded | ColleaguesLoadError

export const fromColleaguesActions = {
  LoadColleagues,
  ColleaguesLoaded,
  ColleaguesLoadError,
}
