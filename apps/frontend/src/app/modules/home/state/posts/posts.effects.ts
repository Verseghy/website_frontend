import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, concatMap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'

import * as PostsActions from './posts.actions'
import { RequestService } from '../../services/request.service'

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private request: RequestService) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      concatMap(action =>
        this.request.listPosts(action.page).pipe(
          map(posts => PostsActions.loadPostsSuccess({ posts })),
          catchError(error => of(PostsActions.loadPostsFailure({ error })))
        )
      )
    )
  )

  loadFeaturedPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadFeaturedPosts),
      concatMap(() =>
        this.request.listFeaturedPosts().pipe(
          map(posts => PostsActions.loadFeaturedPostsSuccess({ posts })),
          catchError(error => of(PostsActions.loadFeaturedPostsFailure({ error })))
        )
      )
    )
  )
}
