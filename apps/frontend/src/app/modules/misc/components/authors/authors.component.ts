import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'

@Component({
  selector: 'verseghy-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit, OnDestroy {
  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/misc/authors', position: 1, name: 'Fejlesztők' },
  ])

  constructor(private structuredDataService: StructuredDataService, private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Fejlesztők')
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }
}
