import { Action } from '@ngrx/store'
import { Solution } from './solution.reducer'

export const QUERY = '[Solution] query solutions'

export const ADDED = '[Solution] added'
export const MODIFIED = '[Solution] modified'
export const REMOVED = '[Solution] removed'

export const UPDATE = '[Solution] update'
export const SUCCESS = '[Solution] update success'

export class Query implements Action {
  readonly type = QUERY
  constructor() {}
}

export class Added implements Action {
  readonly type = ADDED
  constructor(public payload: Solution) {}
}

export class Modified implements Action {
  readonly type = MODIFIED
  constructor(public payload: Solution) {}
}

export class Removed implements Action {
  readonly type = REMOVED
  constructor(public payload: Solution) {}
}

export class Update implements Action {
  readonly type = UPDATE
  constructor(public id: string, public changes: Partial<Solution>) {}
}

export class Success implements Action {
  readonly type = SUCCESS
  constructor() {}
}

export type SolutionActions = Query | Added | Modified | Removed | Update | Success
