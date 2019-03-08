import { CanteenAction, CanteenActionTypes } from './canteen.actions'
import { getISODay } from 'date-fns'

export const CANTEEN_FEATURE_KEY = 'canteen'

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

export interface WeekCanteen {
  1?: Entity
  2?: Entity
  3?: Entity
  4?: Entity
  5?: Entity
  6?: Entity
  7?: Entity
}

export interface CanteenState {
  thisWeek: WeekCanteen
  nextWeek: WeekCanteen
  loaded: boolean // has the Canteen list been loaded
  error?: any // last none error (if any)
}

export interface CanteenPartialState {
  readonly [CANTEEN_FEATURE_KEY]: CanteenState
}

export const initialState: CanteenState = {
  thisWeek: {},
  nextWeek: {},
  loaded: false,
}

export function canteenReducer(state: CanteenState = initialState, action: CanteenAction): CanteenState {
  switch (action.type) {
    case CanteenActionTypes.CanteenLoaded: {
      const processedCanteens: WeekCanteen[] = [{}, {}]
      for (const week of [0, 1]) {
        for (const day of action.payload[week]) {
          const dayOfWeek = getISODay(day.date)
          processedCanteens[week][dayOfWeek] = day
        }
      }

      state = {
        ...state,
        thisWeek: processedCanteens[0],
        nextWeek: processedCanteens[1],
        loaded: true,
      }
      break
    }
  }
  return state
}
