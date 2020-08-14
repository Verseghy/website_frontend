import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'

import * as AlertMessageActions from './alert-message.actions'
import { catchError, concatMap, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { AlertService } from '../../services/alert.service'

@Injectable()
export class AlertMessageEffects {
  loadAlertMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlertMessageActions.loadAlertMessage),
      concatMap(() =>
        this.service.getAlertMessages().pipe(
          map(alertMessages => AlertMessageActions.loadAlertMessageSuccess({ alertMessages })),
          catchError(error => of(AlertMessageActions.loadAlertMessageFailure({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private service: AlertService) {}
}
