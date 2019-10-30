import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, exhaustMap, map } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { Problem } from '../../interfaces/problem.interface'
import { EMPTY } from 'rxjs'


@Injectable()
export class CompetitionEffects {


  loadCompetitions$ = createEffect(() => this.actions$.pipe(
    ofType(CompetitionActions.loadProblems),
    exhaustMap(() => this.afs.collection<Problem>('problems').stateChanges().pipe(
      catchError(e => {console.error(e); return EMPTY}) // TODO(zoltanszepesi): proper errorhandling
    )),
    map(c => {
      console.log(c)
    })
  ), {dispatch: false});


  constructor(
    private actions$: Actions,
    private afs: AngularFirestore
  ) {}

}
