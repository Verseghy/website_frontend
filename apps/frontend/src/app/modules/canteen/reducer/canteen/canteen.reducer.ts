import { CanteenAction, CanteenActionTypes } from './canteen.actions'

export const CANTEEN_FEATURE_KEY = 'canteen'

/**
 * Interface for the 'Canteen' data used in
 *  - CanteenState, and
 *  - canteenReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export class Menu {
  id: number
  menu: string
  type: number
}

export interface Entity {
  id: number
  menu: Menu[]
  date: string
}

export interface CanteenState {
  canteen: Entity[][]
  loaded: boolean // has the Canteen list been loaded
  error?: any // last none error (if any)
}

export interface CanteenPartialState {
  readonly [CANTEEN_FEATURE_KEY]: CanteenState
}

export const initialState: CanteenState = {
  canteen: [],
  loaded: false,
}

export function canteenReducer(state: CanteenState = initialState, action: CanteenAction): CanteenState {
  switch (action.type) {
    case CanteenActionTypes.CanteenLoaded: {
      state = {
        ...state,
        canteen: action.payload,
        loaded: true,
      }
      break
    }
  }
  return state
}
