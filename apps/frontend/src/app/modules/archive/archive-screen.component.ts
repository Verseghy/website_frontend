import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ArchiveFacade } from './state/archive.facade'
import { map } from 'rxjs/operators'
import { StructuredDataService } from '../../services/structured-data.service'
import { TitleService } from '../../services/title.service'

@Component({
  selector: 'verseghy-archive-screen',
  templateUrl: './archive-screen.component.html',
  styleUrls: ['./archive-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveScreenComponent implements OnInit, OnDestroy {
  archives$ = this.archiveFacade.archives$
  archivesList$ = this.archiveFacade.archivesList$.pipe(map((e) => e.filter((i) => i.year)))
  error$ = this.archiveFacade.error$
  loading$ = this.archiveFacade.loading$

  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/archive', position: 1, name: 'Archívum' },
  ])

  constructor(
    private archiveFacade: ArchiveFacade,
    private structuredDataService: StructuredDataService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Archívum')
    this.archiveFacade.loadArchives()
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }

  archiveExpanded({ year, month }: { year: number; month: number }) {
    this.archiveFacade.loadMonth({ year, month })
  }
}
