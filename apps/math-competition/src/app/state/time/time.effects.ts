import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, concatMap, map } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

import * as TimeActions from './time.actions'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Time } from '../../interfaces/time.interface'
import { setTimes } from './time.actions'

@Injectable()
export class TimeEffects {
  loadTimes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeActions.initTimes),
      concatMap(() =>
        this.afs
          .collection<Time>('info')
          .doc<Time>('time')
          .valueChanges()
          .pipe(
            map((e) => setTimes(e)),
            catchError((e) => {
              console.error(e)
              return EMPTY
            }) // TODO(zoltanszepesi): proper error handlings
          )
      )
    )
  )

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
