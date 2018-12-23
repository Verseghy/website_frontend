import { ActionReducerMap } from "@ngrx/store";
import { problemReducer } from "./problem/problem.reducer";
import { solutionReducer } from "./solution/solution.reducer";

export const competitionReducers: ActionReducerMap<any> = {
  problem: problemReducer,
  solution: solutionReducer
};
