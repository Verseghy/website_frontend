import { Action, createReducer, on } from '@ngrx/store'
import * as PostsActions from './posts.actions'
import { Post } from '../../../../models/Post'

export const postsFeatureKey = 'posts'

export interface State {
  posts: Post[]
  featuredPosts: Post[]
}

export const initialState: State = {
  posts: [],
  featuredPosts: [],
}

const postsReducer = createReducer(
  initialState,

  on(PostsActions.loadPosts, state => state),
  on(PostsActions.loadPostsSuccess, (state, action) => ({ ...state, posts: [...state.posts, ...action.posts] })),
  on(PostsActions.loadPostsFailure, (state, action) => state),

  on(PostsActions.loadFeaturedPosts, state => state),
  on(PostsActions.loadFeaturedPostsSuccess, (state, action) => ({ ...state, featuredPosts: [...state.featuredPosts, ...action.posts] })),
  on(PostsActions.loadFeaturedPostsFailure, (state, action) => state)
)

export function reducer(state: State | undefined, action: Action) {
  return postsReducer(state, action)
}
