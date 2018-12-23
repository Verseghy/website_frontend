import { Action } from "@ngrx/store";

export const QUERY  = '[Time] Query time';
export const BEFORE = '[Time] Before competition';
export const DURING = '[Time] During competition';
export const AFTER  = '[Time] After competition';

export class Query implements Action {
  readonly type = QUERY;
  constructor () {}
}

export class Before implements Action {
  readonly type = BEFORE;
  constructor () {}
}

export class During implements Action {
  readonly type = DURING;
  constructor () {}
}

export class After implements Action {
  readonly type = AFTER;
  constructor () {}
}

export type TimeActions
  = Query
  | Before
  | During
  | After;
