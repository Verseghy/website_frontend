import { ColleaguesAction, ColleaguesActionTypes } from './colleagues.actions'

export const COLLEAGUES_FEATURE_KEY = 'colleagues'


export interface Entity {
  id: number
  name: string
  jobs?: string
  subjects?: string
  roles?: string
  awards?: string
  category: number
  image?: string
}

export interface ColleaguesState {
  list: Entity[] // list of Colleagues; analogous to a sql normalized table
  loaded: boolean // has the Colleagues list been loaded
  error?: any // last none error (if any)
}

export interface ColleaguesPartialState {
  readonly [COLLEAGUES_FEATURE_KEY]: ColleaguesState
}

export const initialState: ColleaguesState = {
  list: [],
  loaded: false,
}

export function colleaguesReducer(state: ColleaguesState = initialState, action: ColleaguesAction): ColleaguesState {
  switch (action.type) {
    case ColleaguesActionTypes.ColleaguesLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true,
      }
      break
    }
  }
  return state
}
