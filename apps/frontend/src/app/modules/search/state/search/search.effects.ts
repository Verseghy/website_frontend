import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import * as SearchActions from './search.actions'
import { catchError, concatMap, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { SearchService } from '../../services/search.service'

@Injectable()
export class SearchEffects {
  queryTerm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.queryTerm),
      concatMap((action) =>
        this.service.queryTerm(action.term).pipe(
          map((posts) => SearchActions.loadSearchSuccess({ posts })),
          catchError((error) => of(SearchActions.loadSearchFailure({ error })))
        )
      )
    )
  )

  queryLabel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.queryLabel),
      concatMap((action) =>
        this.service.queryLabel(action.labelID).pipe(
          map((posts) => SearchActions.loadSearchSuccess({ posts })),
          catchError((error) => of(SearchActions.loadSearchFailure({ error })))
        )
      )
    )
  )

  queryAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.queryAuthor),
      concatMap((action) =>
        this.service.queryAuthor(action.authorID).pipe(
          map((posts) => SearchActions.loadSearchSuccess({ posts })),
          catchError((error) => of(SearchActions.loadSearchFailure({ error })))
        )
      )
    )
  )

  constructor(private actions$: Actions, private service: SearchService) {}
}
