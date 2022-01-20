import { createAction, props } from '@ngrx/store'
import { Post } from '../../../../models/Post'

export const queryTerm = createAction('[search] Load Search term query', props<{ term: string }>())

export const queryLabel = createAction('[search] Load Search label query', props<{ labelID: number }>())

export const queryAuthor = createAction('[search] Load Search author query', props<{ authorID: number }>())

export const loadSearchSuccess = createAction('[search] Load Search Success', props<{ posts: Post[] }>())

export const loadSearchFailure = createAction('[search] Load Search Failure', props<{ error: any }>())
