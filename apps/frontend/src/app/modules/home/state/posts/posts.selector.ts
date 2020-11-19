import { postsFeatureKey, State } from './posts.reducer'
import { createSelector } from '@ngrx/store'

const selectFeature = (state) => state[postsFeatureKey]

export const selectPosts = createSelector(selectFeature, (state: State) => state.posts)

export const selectPagesLoaded = createSelector(selectFeature, (state: State) => state.pagesLoaded)

export const selectFeaturedPostsLoaded = createSelector(selectFeature, (state: State) => state.featuredPostsLoaded)

export const selectFeaturedPosts = createSelector(selectFeature, (state: State) => state.featuredPosts)

export const selectLoading = createSelector(selectFeature, (state: State) => state.loading)
