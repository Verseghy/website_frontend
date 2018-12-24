import * as actions from './solution.actions'
import { createEntityAdapter, EntityState } from '@ngrx/entity'
import { createFeatureSelector } from '@ngrx/store'

export interface Solution {
  id: string
  solution: number
}

export const solutionsAdapter = createEntityAdapter<Solution>()
export interface State extends EntityState<Solution> {}

export const initialState: State = solutionsAdapter.getInitialState()

export function solutionReducer(state: State = initialState, action: actions.SolutionActions) {
  switch (action.type) {
    case actions.ADDED:
      return solutionsAdapter.addOne(action.payload, state)

    case actions.MODIFIED:
      return solutionsAdapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload,
        },
        state
      )

    case actions.REMOVED:
      return solutionsAdapter.removeOne(action.payload.id, state)

    default:
      return state
  }
}

export const getSolutionState = createFeatureSelector<State>('solutions')

export const { selectIds, selectEntities, selectAll, selectTotal } = solutionsAdapter.getSelectors(getSolutionState)
