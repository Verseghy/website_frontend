import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { loadProblems, loadSolutions, loadTeam, setSolution } from './competition.actions'
import { selectMerged, selectTeam } from './competition.selectors'
import { Observable } from 'rxjs'
import { Merged } from '../../interfaces/merged.interface'

@Injectable({
  providedIn: 'root',
})
export class CompetitionFacade {
  problems$: Observable<Merged[]> = this.store$.pipe(select(selectMerged))
  teamID$ = this.store$.pipe(select(selectTeam))

  loadCompetition () {
    this.store$.dispatch(loadProblems())
    this.store$.dispatch(loadTeam())
    this.store$.dispatch(loadSolutions())
  }

  sendSolution (id: number, solution: number) {
    this.store$.dispatch(setSolution({id, solution}))
  }

  constructor (
    private store$: Store<any>
  ) {}
}
