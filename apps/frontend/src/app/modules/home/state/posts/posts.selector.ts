import { postsFeatureKey, State } from './posts.reducer'
import { createSelector } from '@ngrx/store'

const selectFeature = state => state[postsFeatureKey]

export const selectPosts = createSelector(
  selectFeature,
  (state: State) => state.posts
)

export const selectFeaturedPosts = createSelector(
  selectFeature,
  (state: State) => state.featuredPosts
)
