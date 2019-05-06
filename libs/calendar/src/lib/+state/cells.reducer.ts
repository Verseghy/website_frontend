import { CellsAction, CellsActionTypes } from './cells.actions'
import { CalendarEvent } from '../calendar.interfaces';

export const CELLS_FEATURE_KEY = 'ui-calendar-cells'

export interface CellsState {
  events: CalendarEvent[],
  month: Date,
  height: number
}

export interface CellsPartialState {
  readonly [CELLS_FEATURE_KEY]: CellsState
}

export const initialState: CellsState = {
  events: [],
  month: new Date(),
  height: 0
}

export function cellsReducer(state: CellsState = initialState, action: CellsAction): CellsState {
  switch (action.type) {
    case CellsActionTypes.SetEvents:
      state = {
        ...state,
        events: action.payload
      }
      break
    
    case CellsActionTypes.SetMonth:
      state = {
        ...state,
        month: action.payload
      }
      break

    case CellsActionTypes.SetHostHeight:
      state = {
        ...state,
        height: action.payload
      }
      break
  }
  return state
}
