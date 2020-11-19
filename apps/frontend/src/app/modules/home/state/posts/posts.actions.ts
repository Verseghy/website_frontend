import { createAction, props } from '@ngrx/store'
import { Post } from '../../../../models/Post'

export const loadPosts = createAction('[home] Load posts', props<{ page: number }>())

export const loadPostsSuccess = createAction('[home] Load Posts Success', props<{ posts: Post[]; page: number }>())

export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: any }>())

export const loadFeaturedPosts = createAction('[home] Load featured posts')

export const loadFeaturedPostsSuccess = createAction('[home] Load featured Posts Success', props<{ posts: Post[] }>())

export const loadFeaturedPostsFailure = createAction('[Posts] Load featured Posts Failure', props<{ error: any }>())
