import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { loadProblems, loadTeam } from './competition.actions'
import { selectProblems } from './competition.selectors'
import { Problem } from '../../interfaces/problem.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CompetitionFacade {
  problems$: Observable<Problem[]> = this.store$.pipe(select(selectProblems))

  loadCompetition () {
    this.store$.dispatch(loadProblems())
    this.store$.dispatch(loadTeam())
  }

  constructor (
    private store$: Store<any>
  ) {}
}
