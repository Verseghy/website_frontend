import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'
import {RequestService} from "../../services/request.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private requestService: RequestService, private structuredDataService: StructuredDataService, private titleService: TitleService) {}

  posts$ = this.requestService.listPosts()
  isLoading$ = this.requestService.listPosts().pipe(map(posts => !posts.length))
  hasPreviousPage$ = this.requestService.hasPreviousPage()

  structuredData0 = this.structuredDataService.addWebSite()
  structuredData1 = this.structuredDataService.addBreadcrumb([{ item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' }])

  ngOnInit() {
    this.titleService.setTitle('')
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
    this.structuredDataService.removeStructuredData(this.structuredData1)
  }

  trackByFn(item) {
    return item.id
  }

  async nextPage() {
    await this.requestService.fetchMore()
  }
}
