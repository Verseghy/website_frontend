import { postsFeatureKey, State } from './posts.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectFeature = createFeatureSelector<State>(postsFeatureKey)

export const selectPosts = createSelector(selectFeature, (state) => state.posts)

export const selectPagesLoaded = createSelector(selectFeature, (state) => state.pagesLoaded)

export const selectFeaturedPostsLoaded = createSelector(selectFeature, (state) => state.featuredPostsLoaded)

export const selectFeaturedPosts = createSelector(selectFeature, (state) => state.featuredPosts)

export const selectLoading = createSelector(selectFeature, (state) => state.loading)
