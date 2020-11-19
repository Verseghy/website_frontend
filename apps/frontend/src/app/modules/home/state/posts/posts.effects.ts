import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, concatMap, filter, withLatestFrom, tap } from 'rxjs/operators'
import { EMPTY, of } from 'rxjs'

import * as PostsActions from './posts.actions'
import { RequestService } from '../../services/request.service'
import { Store } from '@ngrx/store'
import { selectFeaturedPostsLoaded, selectPagesLoaded } from './posts.selector'

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private request: RequestService, private store$: Store<any>) {}

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      withLatestFrom(this.store$.select(selectPagesLoaded)),
      filter(([action, loaded]) => !loaded[action.page]),
      concatMap(([action]) =>
        this.request.listPosts(action.page).pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts, page: action.page })),
          catchError((error) => of(PostsActions.loadPostsFailure({ error })))
        )
      )
    )
  )

  loadFeaturedPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadFeaturedPosts),
      withLatestFrom(this.store$.select(selectFeaturedPostsLoaded)),
      filter(([action, loaded]) => !loaded),
      concatMap(() =>
        this.request.listFeaturedPosts().pipe(
          map((posts) => PostsActions.loadFeaturedPostsSuccess({ posts })),
          catchError((error) => of(PostsActions.loadFeaturedPostsFailure({ error })))
        )
      )
    )
  )
}
