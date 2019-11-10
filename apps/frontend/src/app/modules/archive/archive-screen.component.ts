import { Component, OnInit } from '@angular/core'
import { ArchiveFacade } from './state/archive.facade'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'verseghy-archive-screen',
  templateUrl: './archive-screen.component.html',
  styleUrls: ['./archive-screen.component.scss'],
})
export class ArchiveScreenComponent implements OnInit {
  archives$ = this.archiveFacade.archives$
  archivesList$ = this.archiveFacade.archivesList$.pipe(map(e => e.filter(i => i.year)))
  error$ = this.archiveFacade.error$
  loading$ = this.archiveFacade.loading$

  constructor(private archiveFacade: ArchiveFacade) {}

  ngOnInit() {
    this.archiveFacade.loadArchives()
  }

  archiveExpanded({ year, month }: { year: number; month: number }) {
    this.archiveFacade.loadMonth({ year, month })
  }
}
