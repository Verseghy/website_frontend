import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { Entity, EVENTS_FEATURE_KEY, EventsState } from './events.reducer'
import { AddLoadedMonth, EventsActionTypes, EventsLoaded, MonthChange } from './events.actions'
import { of } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { RequestService } from '../services/request.service'

@Injectable()
export class EventsEffects {
  queryMonth = createEffect(() =>
    this.actions$.pipe(
      ofType<MonthChange>(EventsActionTypes.MonthChange),
      withLatestFrom(this.store.pipe(select((state) => state[EVENTS_FEATURE_KEY]))),
      map(([action, storeState]) => {
        if (!storeState.loadedMonths.includes(JSON.stringify(action.payload))) {
          this.store.dispatch(new AddLoadedMonth(JSON.stringify(action.payload)))
          return this.request.getEvents(action.payload).pipe(catchError(() => of([])))
        } else {
          const empty: Entity[] = []
          return of(empty)
        }
      }),
      switchMap((data) => data),
      switchMap((data) => {
        return of(new EventsLoaded(data))
      })
    )
  )

  constructor(private actions$: Actions, private store: Store<EventsState>, private request: RequestService) {}
}
