import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { initTimes } from './time.actions'
import { selectEndTime, selectStartTime } from './time.selectors'

@Injectable({
  providedIn: 'root',
})
export class TimeFacade {
  startTime$ = this.store$.pipe(select(selectStartTime))
  endTime$ = this.store$.pipe(select(selectEndTime))

  init() {
    this.store$.dispatch(initTimes())
  }

  constructor(private store$: Store<any>) {}
}
