import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { interval, Observable, of } from 'rxjs'
import * as timeActions from './time.actions'
import { filter, first, map, startWith, switchMap } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable()
export class TimeEffects {
  @Effect()
  getTime: Observable<Action> = this.actions$.pipe(
    ofType(timeActions.QUERY),
    switchMap(() => {
      return this.afs.doc('info/info').get()
    }),
    map(doc => doc.data()),
    switchMap(data => {
      if (data.startdate.toDate() > new Date()) {
        this.store$.dispatch(new timeActions.Before())
        return interval(1000).pipe(
          map(() => {
            if (data.startdate.toDate() < new Date()) {
              return of('During')
            } else {
              return of(null)
            }
          })
        )
      } else if (data.startdate.toDate() < new Date() && data.enddate.toDate() > new Date()) {
        this.store$.dispatch(new timeActions.During())
        return interval(60000).pipe(
          startWith(0),
          map(() => {
            if (data.enddate.toDate() < new Date()) {
              return of('After')
            } else {
              return of(null)
            }
          })
        )
      } else {
        return of(of('After'))
      }
    }),
    switchMap(data => data),
    filter(data => data),
    first(data => data),
    map(action => {
      console.log(action)
      return {
        type: `[Time] ${action} competition`,
      }
    })
  )

  constructor(private actions$: Actions, private afs: AngularFirestore, private store$: Store<any>) {}
}
