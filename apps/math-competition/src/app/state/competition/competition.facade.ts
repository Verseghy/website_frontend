import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { loadProblems } from './competition.actions'
import { selectProblems } from './competition.selectors'
import { Problem } from '../../interfaces/problem.interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CompetitionFacade {
  problems$: Observable<Problem[]> = this.store$.pipe(select(selectProblems))

  loadProblems () {
    this.store$.dispatch(loadProblems())
  }

  constructor (
    private store$: Store<any>
  ) {}
}
