import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { Problem } from '../../interfaces/problem.interface'
import { EMPTY } from 'rxjs'
import { problemAdded, problemModified, problemRemoved } from './competition.actions'


@Injectable()
export class CompetitionEffects {


  loadCompetitions$ = createEffect(() => this.actions$.pipe(
    ofType(CompetitionActions.loadProblems),
    exhaustMap(() => this.afs.collection<Problem>('problems').stateChanges().pipe(
      catchError(e => {console.error(e); return EMPTY}) // TODO(zoltanszepesi): proper errorhandling
    )),
    mergeMap(c => {
      return c.map(e => {
        switch (e.type) {
          case 'added':
            return problemAdded(e.payload.doc.data())
          case 'modified':
            return problemModified(e.payload.doc.data())
          case 'removed':
            return problemRemoved(e.payload.doc.data())
        }
      })
    })
  ));


  constructor(
    private actions$: Actions,
    private afs: AngularFirestore
  ) {}

}
