import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import { catchError, concatMap, exhaustMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators'

import * as CompetitionActions from './competition.actions'
import { AngularFirestore } from '@angular/fire/firestore'
import { Problem } from '../../interfaces/problem.interface'
import { combineLatest, EMPTY, forkJoin, from, of } from 'rxjs'
import {
  loadTeamSucceed,
  problemAdded,
  problemModified,
  problemRemoved,
  setProblemFailure,
  setProblemSuccess,
  solutionAdded,
  solutionModified,
  solutionRemoved,
} from './competition.actions'
import { AuthFacade } from '../auth/auth.facade'
import { Team } from '../../interfaces/team.interface'
import { CompetitionFacade } from './competition.facade'
import { Solution } from '../../interfaces/solution.interface'
import { AngularFireStorage } from '@angular/fire/storage'
import { Store } from '@ngrx/store'
import { selectProblems } from './competition.selectors'

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
            catchError((e) => {
              console.error(e)
              return EMPTY
            }) // TODO(zoltanszepesi): proper errorhandling
          )
      ),
      mergeMap((c) => {
        return Promise.all(
          c.map(async (e) => {
            switch (e.type) {
              case 'added': {
                const problem = e.payload.doc.data()
                if (problem.hasImage) {
                  problem.image = await this.afstorage.ref(`images/${problem.id}.png`).getDownloadURL().toPromise()
                }
                return problemAdded({ problem })
              }
              case 'modified': {
                const problem = e.payload.doc.data()
                if (problem.hasImage) {
                  problem.image = await this.afstorage.ref(`images/${problem.id}.png`).getDownloadURL().toPromise()
                }
                return problemModified({ problem })
              }
              case 'removed': {
                return problemRemoved({ problem: e.payload.doc.data() })
              }
            }
          })
        )
      }),
      mergeMap((d) => d)
    )
  )

  loadTeam$ = createEffect(() =>
    combineLatest([this.actions$.pipe(ofType(CompetitionActions.loadTeam)), this.authFacade.uid$]).pipe(
      switchMap(([, uid]) => {
        if (uid === '') return of([])
        return this.afs.collection<Team>('teams', (ref) => ref.where('members', 'array-contains', uid)).stateChanges()
      }),
      map((e) => {
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
            catchError((e) => {
              console.error(e)
              return EMPTY
            })
          )
      }),
      mergeMap((c) => {
        return c.map((e) => {
          switch (e.type) {
            case 'added':
              return solutionAdded({ solution: e.payload.doc.data() })
            case 'modified':
              return solutionModified({ solution: e.payload.doc.data() })
            case 'removed':
              return solutionRemoved({ solution: e.payload.doc.data() })
          }
        })
      })
    )
  )

  setSolution$ = createEffect(
    () =>
      combineLatest([this.actions$.pipe(ofType(CompetitionActions.setSolution)), this.competitionFacade.teamID$]).pipe(
        mergeMap(([{ solution }, teamID]) => {
          if (teamID === '') return of()
          return from(
            this.afs.collection(`teams/${teamID}/solutions`).doc(String(solution.id)).set({ id: solution.id, solution: solution.solution })
          )
        })
      ),
    { dispatch: false }
  )

  setProblem$ = createEffect(() =>
    // @ts-ignore
    this.actions$.pipe(
      ofType(CompetitionActions.setProblem),
      mergeMap(({ problem }) => {
        return from(this.afs.collection('problems').doc(problem.id.toString()).set(problem)).pipe(
          map(() => {
            return setProblemSuccess({ problem })
          }),
          catchError((error) => {
            return of(setProblemFailure({ problem, error }))
          })
        )
      }),
      catchError((err) => {
        console.log(err)
        return of()
      })
    )
  )

  removeProblem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CompetitionActions.removeProblem),
        concatMap(({ id }) => {
          return from(this.afs.collection('problems').doc(id.toString()).delete())
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private afs: AngularFirestore,
    private afstorage: AngularFireStorage,
    private authFacade: AuthFacade,
    private competitionFacade: CompetitionFacade,
    private store$: Store<any>
  ) {}
}
