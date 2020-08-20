import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { fetch } from '@nrwl/angular'
import * as CompetitionsActions from './competitions.actions'

@Injectable()
export class CompetitionsEffects {
  loadCompetitions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionsActions.loadCompetitions),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CompetitionsActions.loadCompetitionsSuccess({ competitions: [] })
        },

        onError: (action, error) => {
          console.error('Error', error)
          return CompetitionsActions.loadCompetitionsFailure({ error })
        },
      })
    )
  )

  constructor(private actions$: Actions) {}
}
