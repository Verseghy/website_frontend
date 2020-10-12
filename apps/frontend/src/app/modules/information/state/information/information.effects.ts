import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, concatMap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'

import * as InformationActions from './information.actions'
import { RequestService } from '../../service/request.service'

@Injectable()
export class InformationEffects {
  queryMenuItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InformationActions.queryMenuItems),
      concatMap(() =>
        this.request.getMenuItems().pipe(
          map((data) => InformationActions.queryMenuItemsSuccess({ data })),
          catchError((error) => of(InformationActions.queryMenuItemsFailure({ error })))
        )
      )
    )
  })

  queryPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InformationActions.queryPage),
      concatMap(({ slug }) =>
        this.request.getPageBySlug(slug).pipe(
          map((data) => InformationActions.queryPageSuccess({ data })),
          catchError((error) => of(InformationActions.queryPageFailure({ error })))
        )
      )
    )
  })

  constructor(private actions$: Actions, private request: RequestService) {}
}
