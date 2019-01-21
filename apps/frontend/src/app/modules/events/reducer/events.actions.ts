import { Action } from '@ngrx/store'
import { Entity } from './events.reducer'

export enum EventsActionTypes {
  MonthChange = '[Events] Month Change',
  AddLoadedMonth = '[Events] Add To Loaded Months',
  EventsLoaded = '[Events] Events Loaded',
  EventsLoadError = '[Events] Events Load Error',
}

export class MonthChange implements Action {
  readonly type = EventsActionTypes.MonthChange
  constructor(
    public payload: {
      year: number
      month: number
    }
  ) {}
}

export class AddLoadedMonth implements Action {
  readonly type = EventsActionTypes.AddLoadedMonth
  constructor(public payload: string) {}
}

export class EventsLoadError implements Action {
  readonly type = EventsActionTypes.EventsLoadError
  constructor(public payload: any) {}
}

export class EventsLoaded implements Action {
  readonly type = EventsActionTypes.EventsLoaded
  constructor(public payload: Entity[]) {}
}

export type EventsAction = EventsLoaded | EventsLoadError | MonthChange | AddLoadedMonth
