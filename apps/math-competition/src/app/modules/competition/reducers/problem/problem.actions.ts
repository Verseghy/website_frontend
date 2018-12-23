import { Action } from "@ngrx/store";
import { Problem } from "./problem.reducer";

export const QUERY = '[Problem] query competitions';

export const ADDED    = '[Problem] added';
export const MODIFIED = '[Problem] modified';
export const REMOVED  = '[Problem] removed';


export class Query implements Action {
  readonly type = QUERY;
  constructor () {}
}

export class Added implements Action {
  readonly type = ADDED;
  constructor (public payload: Problem) {}
}

export class Modified implements Action {
  readonly type = MODIFIED;
  constructor (public payload: Problem) {}
}

export class Removed implements Action {
  readonly type = REMOVED;
  constructor (public payload: Problem) {}
}

export type ProblemActions
  = Query
  | Added
  | Modified
  | Removed;
