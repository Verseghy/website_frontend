import { Action } from '@ngrx/store'
import { CalendarEvent } from '../calendar.interfaces';

export enum CellsActionTypes {
  SetEvents = '[Cells] Set Events',
  SetMonth = '[Cells] Set Month',
  SetHostHeight = '[Cells] Set Host Height'
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

export type CellsAction = SetEvents | SetMonth | SetHostHeight

export const fromCellsActions = { SetEvents, SetMonth, SetHostHeight }
