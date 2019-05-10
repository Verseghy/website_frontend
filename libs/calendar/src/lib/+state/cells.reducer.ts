import { CellsAction, CellsActionTypes } from './cells.actions'
import { CalendarEvent } from '../calendar.interfaces'
import { addMonths, subMonths } from 'date-fns'

export const CELLS_FEATURE_KEY = 'ui-calendar-cells'

export interface CellsState {
  events: CalendarEvent[]
  month: Date
  height: number
  selectedEvent: number
  selectedMoreEvents: Date
}

export interface CellsPartialState {
  readonly [CELLS_FEATURE_KEY]: CellsState
}

export const initialState: CellsState = {
  events: [],
  month: new Date(),
  height: 0,
  selectedEvent: -1,
  selectedMoreEvents: new Date(),
}

export function cellsReducer(state: CellsState = initialState, action: CellsAction): CellsState {
  switch (action.type) {
    case CellsActionTypes.SetEvents:
      state = {
        ...state,
        events: action.payload,
      }
      break

    case CellsActionTypes.SetMonth:
      state = {
        ...state,
        month: action.payload,
      }
      break

    case CellsActionTypes.SetHostHeight:
      state = {
        ...state,
        height: action.payload,
      }
      break

    case CellsActionTypes.SetSelectedEvent:
      state = {
        ...state,
        selectedEvent: action.payload,
      }
      break

    case CellsActionTypes.SetSelectedMoreEvent:
      state = {
        ...state,
        selectedMoreEvents: action.payload,
      }
      break

    case CellsActionTypes.NextMonth:
      state = {
        ...state,
        month: addMonths(state.month, 1),
      }
      break

    case CellsActionTypes.PreviousMonth:
      state = {
        ...state,
        month: subMonths(state.month, 1),
      }
      break

    case CellsActionTypes.Today:
      state = {
        ...state,
        month: new Date(),
      }
      break
  }
  return state
}
