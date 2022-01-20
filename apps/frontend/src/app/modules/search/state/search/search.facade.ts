import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'

import * as fromSearch from './search.reducer'
import * as SearchSelectors from './search.selectors'
import { queryAuthor, queryLabel, queryTerm } from './search.actions'

@Injectable()
export class SearchFacade {
  loaded$ = this.store.pipe(select(SearchSelectors.getSearchLoaded))
  error$ = this.store.pipe(select(SearchSelectors.getSearchError))
  posts$ = this.store.pipe(select(SearchSelectors.getSearchPosts))

  constructor(private store: Store<fromSearch.SearchPartialState>) {}

  queryTerm(term: string) {
    this.store.dispatch(queryTerm({ term }))
  }

  queryLabel(labelID: number) {
    this.store.dispatch(queryLabel({ labelID }))
  }

  queryAuthor(authorID: number) {
    this.store.dispatch(queryAuthor({ authorID }))
  }
}
