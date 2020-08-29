import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as CompetitionsActions from './competitions.actions'
import { CompetitionsService } from '../../services/competitions.service'
import { catchError, concatMap, map } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class CompetitionsEffects {
  loadCompetitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionsActions.loadRecentCompetitions),
      concatMap(() =>
        this.service.getRecentCompetitions().pipe(
          map((competitions) => CompetitionsActions.loadCompetitionsSuccess({ competitions })),
          catchError((error) => of(CompetitionsActions.loadCompetitionsFailure({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private service: CompetitionsService) {}
}
