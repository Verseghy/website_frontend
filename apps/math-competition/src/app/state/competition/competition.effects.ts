import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { Problem } from '../../interfaces/problem.interface'
import { combineLatest, EMPTY, of } from 'rxjs'
import { loadTeamSucceed, problemAdded, problemModified, problemRemoved } from './competition.actions'
import { AuthFacade } from '../auth/auth.facade'
import { Team } from '../../interfaces/team.interface'


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

  loadTeam$ = createEffect(() => combineLatest([
    this.actions$.pipe(ofType(CompetitionActions.loadTeam)),
    this.authFacade.uid$
  ]).pipe(
    switchMap(([, uid]) => {
      if (uid === '') return of([])
      return this.afs.collection<Team>('teams', ref => ref.where('members', 'array-contains', uid)).stateChanges()
    }),
    map(e => {
      if (e.length) {
        return loadTeamSucceed({id: e[0].payload.doc.id})
      } else {
        return loadTeamSucceed({id: ''})
      }
    })
  ))


  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private authFacade: AuthFacade
  ) {}

}
