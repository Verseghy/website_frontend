import { EventsAction, EventsActionTypes } from './events.actions'

export const EVENTS_FEATURE_KEY = 'events'

export interface Entity {
  id: number
  dateFrom: Date
  dateTo: Date
  title: string
  description: string
  color: string
}

export interface EventsState {
  list: Entity[]
  loaded: boolean
  error?: any
  loadedMonths: string[]
}

export interface EventsPartialState {
  readonly [EVENTS_FEATURE_KEY]: EventsState
}

export const initialState: EventsState = {
  list: [],
  loaded: false,
  loadedMonths: [],
}

export function eventsReducer(state: EventsState = initialState, action: EventsAction): EventsState {
  switch (action.type) {
    case EventsActionTypes.MonthChange: {
      state = {
        ...state,
        loaded: false,
      }
      break
    }

    case EventsActionTypes.EventsLoaded: {
      state = {
        ...state,
        list: [...state.list, ...action.payload],
        loaded: true,
      }
      break
    }

    case EventsActionTypes.EventsLoadError: {
      state = {
        ...state,
        loaded: true,
        error: action.payload,
      }
      break
    }

    case EventsActionTypes.AddLoadedMonth: {
      state = {
        ...state,
        loadedMonths: [...state.loadedMonths, action.payload],
      }
      break
    }
  }
  return state
}
