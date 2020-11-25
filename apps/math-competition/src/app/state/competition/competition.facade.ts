import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { loadProblems, loadSolutions, loadTeam, removeProblem, setProblem, setProblemSuccess, setSolution } from './competition.actions'
import { selectMerged, selectProblems, selectTeam } from './competition.selectors'
import { Observable } from 'rxjs'
import { Merged } from '../../interfaces/merged.interface'
import { Problem } from '../../interfaces/problem.interface'
import { Actions, ofType } from '@ngrx/effects'

@Injectable({
  providedIn: 'root',
})
export class CompetitionFacade {
  problems$ = this.store$.pipe(select(selectProblems))
  mergedSolutionsAndProblems$: Observable<Merged[]> = this.store$.pipe(select(selectMerged))
  teamID$ = this.store$.pipe(select(selectTeam))
  setProblemSucces$ = this.actions$.pipe(ofType(setProblemSuccess))

  loadProblems() {
    this.store$.dispatch(loadProblems())
  }

  loadCompetition() {
    this.store$.dispatch(loadProblems())
    this.store$.dispatch(loadTeam())
    this.store$.dispatch(loadSolutions())
  }

  sendSolution(id: number, solution: number) {
    this.store$.dispatch(setSolution({ solution: { id, solution } }))
  }

  setProblem(problem: Problem) {
    this.store$.dispatch(setProblem({ problem }))
  }

  removeProblem(id: number) {
    this.store$.dispatch(removeProblem({ id }))
  }

  constructor(private store$: Store<any>, private actions$: Actions) {}
}
