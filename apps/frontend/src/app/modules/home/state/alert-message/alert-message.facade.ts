import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as fromAlertMessage from './alert-message.reducer'
import * as AlertMessageSelectors from './alert-message.selectors'
import { loadAlertMessage } from './alert-message.actions'

@Injectable()
export class AlertMessageFacade {
  loaded$ = this.store.pipe(select(AlertMessageSelectors.getAlertMessageLoaded))
  error$ = this.store.pipe(select(AlertMessageSelectors.getAlertMessageError))
  alertMessages$ = this.store.pipe(select(AlertMessageSelectors.getAlertMessages))

  constructor(private store: Store<fromAlertMessage.AlertMessagePartialState>) {}

  queryMessages() {
    this.store.dispatch(loadAlertMessage())
  }
}
