import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AngularFirestore } from '@angular/fire/firestore'

import * as competitionActions from './problem.actions'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { Problem } from './problem.reducer'

@Injectable()
export class ProblemEffects {
  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(competitionActions.QUERY),
    switchMap(() => {
      return this.afs.collection<Problem>('problems').stateChanges()
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Problem] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data(),
        },
      }
    })
  )

  constructor(private actions$: Actions, private afs: AngularFirestore) {}
}
