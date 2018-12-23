import * as actions from "./problem.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export interface Problem {
  id: string;
  text: string;
  image: boolean;
}

export const problemsAdapter = createEntityAdapter<Problem>();
export interface State extends EntityState<Problem> {}

export const initialState: State = problemsAdapter.getInitialState();

export function problemReducer(
  state: State = initialState,
  action: actions.ProblemActions) {

  switch (action.type) {
    case actions.ADDED:
      return problemsAdapter.addOne(action.payload, state);

    case actions.MODIFIED:
      return problemsAdapter.updateOne({
        id: action.payload.id,
        changes: action.payload
      }, state);

    case actions.REMOVED:
      return problemsAdapter.removeOne(action.payload.id, state);

    default:
      return state;

  }
}

export const getProblemState = createFeatureSelector<State>('problems');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = problemsAdapter.getSelectors(getProblemState);
