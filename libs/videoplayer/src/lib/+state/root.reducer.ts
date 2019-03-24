import { RootAction, RootActionTypes } from './root.actions'

export const ROOT_FEATURE_KEY = 'root'

export interface RootState {
  volume: {
    currentVolume: number,
    lastVolume: number,
  }
}

export interface RootPartialState {
  readonly [ROOT_FEATURE_KEY]: RootState
}

export const initialState: RootState = {
  volume: {
    currentVolume: 0.5,
    lastVolume: 0.5,
  }
}

export function rootReducer(state: RootState = initialState, action: RootAction): RootState {
  switch (action.type) {
    case RootActionTypes.VolumeChange:
      state = {
        ...state,
        volume: {
          currentVolume: action.payload,
          lastVolume: state.volume.lastVolume,
        }
      }
      break

    case RootActionTypes.Mute:
      if (state.volume.currentVolume === 0) {
        state = {
          ...state,
          volume: {
            currentVolume: state.volume.lastVolume,
            lastVolume: state.volume.lastVolume,
          }
        }
      } else {
        state = {
          ...state,
          volume: {
            currentVolume: 0,
            lastVolume: state.volume.currentVolume,
          }
        }
      }
      break

    case RootActionTypes.SetLastVolume:
      state = {
        ...state,
        volume: {
          currentVolume: state.volume.currentVolume,
          lastVolume: state.volume.currentVolume,
        }
      }
      break

    case RootActionTypes.VolumeUp:
      let nextVolumeUp = state.volume.currentVolume + 0.05
      if (state.volume.currentVolume + 0.05 >= 1) {
        nextVolumeUp = 1
      }
      state = {
        ...state,
        volume: {
          currentVolume: nextVolumeUp,
          lastVolume: state.volume.lastVolume,
        }
      }
      break

    case RootActionTypes.VolumeDown:
      let nextVolumeDown = state.volume.currentVolume - 0.05
      if (state.volume.currentVolume - 0.05 <= 0) {
        nextVolumeDown = 0
      }
      state = {
        ...state,
        volume: {
          currentVolume: nextVolumeDown,
          lastVolume: state.volume.lastVolume,
        }
      }
      break
  }
  return state
}
