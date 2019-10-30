import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { exhaustMap, map } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'


@Injectable()
export class CompetitionEffects {


  loadCompetitions$ = createEffect(() => this.actions$.pipe(
    ofType(CompetitionActions.loadProblems),
    exhaustMap(() => this.afs.collection('problems').stateChanges()),
    map(c => {
      console.log(c)
    })
  ), {dispatch: false});


  constructor(
    private actions$: Actions,
    private afs: AngularFirestore
  ) {}

}
