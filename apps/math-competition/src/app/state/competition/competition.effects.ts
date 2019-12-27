import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { Problem } from '../../interfaces/problem.interface'
import { combineLatest, EMPTY, of } from 'rxjs'
import {
  loadTeamSucceed,
  problemAdded,
  problemModified,
  problemRemoved,
  solutionAdded,
  solutionModified,
  solutionRemoved,
} from './competition.actions'
import { AuthFacade } from '../auth/auth.facade'
import { Team } from '../../interfaces/team.interface'
import { CompetitionFacade } from './competition.facade'
import { Solution } from '../../interfaces/solution.interface'
import { AngularFireStorage } from '@angular/fire/storage'

@Injectable()
export class CompetitionEffects {
  loadProblems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.loadProblems),
      exhaustMap(() =>
        this.afs
          .collection<Problem>('problems')
          .stateChanges()
          .pipe(
            catchError(e => {
              console.error(e)
              return EMPTY
            }) // TODO(zoltanszepesi): proper errorhandling
          )
      ),
      mergeMap(c => {
        return Promise.all(
          c.map(async e => {
            switch (e.type) {
              case 'added': {
                const problem = e.payload.doc.data()
                if (problem.hasImage) {
                  problem.image = await this.afstorage
                    .ref(`images/${problem.id}.png`)
                    .getDownloadURL()
                    .toPromise()
                }
                return problemAdded(problem)
              }
              case 'modified': {
                const problem = e.payload.doc.data()
                if (problem.hasImage) {
                  problem.image = await this.afstorage
                    .ref(`images/${problem.id}.png`)
                    .getDownloadURL()
                    .toPromise()
                }
                return problemModified(problem)
              }
              case 'removed': {
                return problemRemoved(e.payload.doc.data())
              }
            }
          })
        )
      }),
      mergeMap(d => d)
    )
  )

  loadTeam$ = createEffect(() =>
    combineLatest([this.actions$.pipe(ofType(CompetitionActions.loadTeam)), this.authFacade.uid$]).pipe(
      switchMap(([, uid]) => {
        if (uid === '') return of([])
        return this.afs.collection<Team>('teams', ref => ref.where('members', 'array-contains', uid)).stateChanges()
      }),
      map(e => {
        if (e.length) {
          return loadTeamSucceed({ id: e[0].payload.doc.id })
        } else {
          return loadTeamSucceed({ id: '' })
        }
      })
    )
  )

  loadSolutions$ = createEffect(() =>
    combineLatest([this.actions$.pipe(ofType(CompetitionActions.loadSolutions)), this.competitionFacade.teamID$]).pipe(
      switchMap(([, teamID]) => {
        if (teamID === '') return of([])
        return this.afs
          .collection<Solution>(`teams/${teamID}/solutions`)
          .stateChanges()
          .pipe(
            catchError(e => {
              console.error(e)
              return EMPTY
            })
          )
      }),
      mergeMap(c => {
        return c.map(e => {
          switch (e.type) {
            case 'added':
              return solutionAdded(e.payload.doc.data())
            case 'modified':
              return solutionModified(e.payload.doc.data())
            case 'removed':
              return solutionRemoved(e.payload.doc.data())
          }
        })
      })
    )
  )

  setSolution$ = createEffect(
    () =>
      combineLatest([this.actions$.pipe(ofType(CompetitionActions.setSolution)), this.competitionFacade.teamID$]).pipe(
        mergeMap(([e, teamID]) => {
          if (teamID === '') return of()
          return of(
            this.afs
              .collection(`teams/${teamID}/solutions`)
              .doc(String(e.id))
              .set({ id: e.id, solution: e.solution })
          )
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private afstorage: AngularFireStorage,
    private authFacade: AuthFacade,
    private competitionFacade: CompetitionFacade
  ) {}
}
