import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store'
import { loadArchives } from './archive.actions'
import { selectArchives, selectError, selectLoading } from './archive.selectors'

@Injectable({
  providedIn: 'root'
})
export class ArchiveFacade {

  archives$ = this.store.pipe(select(selectArchives))
  error$ = this.store.pipe(select(selectError))
  loading$ = this.store.pipe(select(selectLoading))

  loadArchives () {
    this.store.dispatch(loadArchives())
  }

  constructor(private store: Store<any>) { }
}
