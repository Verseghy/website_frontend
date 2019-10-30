import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { loadProblems } from './competition.actions'

@Injectable({
  providedIn: 'root',
})
export class CompetitionFacade {
  loadProblems () {
    this.store$.dispatch(loadProblems)
  }

  constructor (
    private store$: Store<any>
  ) {}
}
