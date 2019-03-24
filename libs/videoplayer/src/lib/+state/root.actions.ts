import { Action } from '@ngrx/store'

export enum RootActionTypes {
  VolumeChange = '[Root] Volume Change',
  Mute = '[Root] Mute',
  SetLastVolume = '[Root] Set Last Volume',
  VolumeUp = '[Root] Volume Up',
  VolumeDown = '[Root] Volume Down',
}

export class VolumeChange implements Action {
  readonly type = RootActionTypes.VolumeChange
  constructor(public payload: number) {}
}

export class Mute implements Action {
  readonly type = RootActionTypes.Mute
}
export class SetLastVolume implements Action {
  readonly type = RootActionTypes.SetLastVolume
}

export class VolumeUp implements Action {
  readonly type = RootActionTypes.VolumeUp
}

export class VolumeDown implements Action {
  readonly type = RootActionTypes.VolumeDown
}

export type RootAction 
  = VolumeChange
  | Mute
  | SetLastVolume
  | VolumeUp
  | VolumeDown
