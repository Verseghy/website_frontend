import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Action, select, Store } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AngularFirestore } from '@angular/fire/firestore'

import * as solutionActions from './solution.actions'
import * as authActions from '../../../../reducers/auth/auth.actions'
import { filter, map, mergeMap, switchMap } from 'rxjs/operators'

@Injectable()
export class SolutionEffects {
  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(solutionActions.QUERY),
    switchMap(() => {
      this.store.dispatch(new authActions.GetUser())
      return this.store.pipe(
        select('auth'),
        filter(data => data),
        filter(data => !data.loading),
        map(data => {
          return of(data)
        })
      )
    }),
    switchMap(data => data),
    switchMap(user => {
      return this.afs
        .collection('teams')
        .doc(user.uid)
        .collection('solutions')
        .stateChanges()
    }),
    mergeMap(actions => actions),
    map(action => {
      return {
        type: `[Solution] ${action.type}`,
        payload: {
          id: action.payload.doc.id,
          ...action.payload.doc.data(),
        },
      }
    })
  )

  @Effect()
  update$: Observable<Action> = this.actions$.pipe(
    ofType(solutionActions.UPDATE),
    switchMap((action: solutionActions.Update) => {
      this.store.dispatch(new authActions.GetUser())
      return this.store.pipe(
        select('auth'),
        filter(data => data),
        filter(data => !data.loading),
        map(data => {
          return of({ data: data, action: action })
        })
      )
    }),
    switchMap(data => data),
    map(data => {
      const id = data.action.id.toString()
      return this.afs
        .collection('teams')
        .doc(data.data.uid)
        .collection('solutions')
        .doc(id)
        .set(data.action.changes)
    }),
    map(() => new solutionActions.Success())
  )

  constructor(private actions$: Actions, private afs: AngularFirestore, private store: Store<any>) {}
}
