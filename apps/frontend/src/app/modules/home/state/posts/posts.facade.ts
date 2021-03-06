import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'
import { loadFeaturedPosts, loadPosts } from './posts.actions'
import { selectFeaturedPosts, selectLoading, selectPosts } from './posts.selector'

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  private page = 0
  posts$ = this.store.select(selectPosts)
  featuredPosts$ = this.store.select(selectFeaturedPosts)
  isLoading$ = this.store.select(selectLoading)

  constructor(private http: HttpClient, private store: Store<any>) {}

  loadInitPage() {
    if (this.page === 0) {
      this.page++
      this.store.dispatch(loadPosts({ page: this.page }))
      this.store.dispatch(loadFeaturedPosts())
    }
  }

  loadNextPage() {
    this.store.dispatch(loadPosts({ page: ++this.page }))
  }
}
