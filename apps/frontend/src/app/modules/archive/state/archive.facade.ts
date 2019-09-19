import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { loadArchivesDetail, loadArchives } from './archive.actions'
import { selectArchives, selectArchivesList, selectError, selectLoading } from './archive.selectors'

@Injectable({
  providedIn: 'root',
})
export class ArchiveFacade {
  archives$ = this.store.pipe(select(selectArchives))
  archivesList$ = this.store.pipe(select(selectArchivesList))
  error$ = this.store.pipe(select(selectError))
  loading$ = this.store.pipe(select(selectLoading))

  loadArchives() {
    this.store.dispatch(loadArchives())
  }

  loadMonth({ year, month }: { year: number; month: number }) {
    this.store.dispatch(loadArchivesDetail({ year, month }))
  }

  constructor(private store: Store<any>) {}
}
