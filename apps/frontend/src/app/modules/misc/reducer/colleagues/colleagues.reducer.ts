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
  categories: Entity[][] // list of Colleagues; analogous to a sql normalized table
  loaded: boolean // has the Colleagues list been loaded
  error?: any // last none error (if any),
  visibleCategories: Map<number, boolean>
}

export interface ColleaguesPartialState {
  readonly [COLLEAGUES_FEATURE_KEY]: ColleaguesState
}

export const initialState: ColleaguesState = {
  categories: null,
  loaded: false,
  visibleCategories: new Map<number, boolean>(),
}

export function colleaguesReducer(state: ColleaguesState = initialState, action: ColleaguesAction): ColleaguesState {
  switch (action.type) {
    case ColleaguesActionTypes.ColleaguesLoaded: {
      const categories: Entity[][] = [[], [], [], [], [], []]

      for (const colleague of action.payload) {
        categories[colleague.category].push(colleague)
      }
      state = {
        ...state,
        categories,
        loaded: true,
      }
      break
    }
    case ColleaguesActionTypes.CategoryInViewport: {
      const categoriesmap = state.visibleCategories

      categoriesmap.set(action.payload[0], action.payload[1])

      state = {
        ...state,
        visibleCategories: categoriesmap,
      }

      break
    }
  }
  return state
}
