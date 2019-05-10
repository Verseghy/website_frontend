import { Action } from '@ngrx/store'
import { CalendarEvent } from '../calendar.interfaces'

export enum CellsActionTypes {
  SetEvents = '[Cells] Set Events',
  SetMonth = '[Cells] Set Month',
  SetHostHeight = '[Cells] Set Host Height',
  SetSelectedEvent = '[Cells] Set Selected Event',
  SetSelectedMoreEvent = '[Cells] Set Selected More Events',
  NextMonth = '[Cells] Next Month',
  PreviousMonth = '[Cells] Previous Month',
  Today = '[Cells] Today',
}

export class SetEvents implements Action {
  readonly type = CellsActionTypes.SetEvents
  constructor(public payload: CalendarEvent[]) {}
}

export class SetMonth implements Action {
  readonly type = CellsActionTypes.SetMonth
  constructor(public payload: Date) {}
}

export class SetHostHeight implements Action {
  readonly type = CellsActionTypes.SetHostHeight
  constructor(public payload: number) {}
}

export class SetSelectedEvent implements Action {
  readonly type = CellsActionTypes.SetSelectedEvent
  constructor(public payload: number) {}
}

export class SetSelectedMoreEvent implements Action {
  readonly type = CellsActionTypes.SetSelectedMoreEvent
  constructor(public payload: Date) {}
}

export class NextMonth implements Action {
  readonly type = CellsActionTypes.NextMonth
}

export class PreviousMonth implements Action {
  readonly type = CellsActionTypes.PreviousMonth
}

export class Today implements Action {
  readonly type = CellsActionTypes.Today
}

export type CellsAction = SetEvents | SetMonth | SetHostHeight | SetSelectedEvent | SetSelectedMoreEvent | NextMonth | PreviousMonth | Today

export const fromCellsActions = {
  SetEvents,
  SetMonth,
  SetHostHeight,
  SetSelectedEvent,
  SetSelectedMoreEvent,
  NextMonth,
  PreviousMonth,
  Today,
}
