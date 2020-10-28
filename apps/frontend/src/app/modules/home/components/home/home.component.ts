import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { PostsFacade } from '../../state/posts/posts.facade'
import { StructuredDataService } from '../../../../services/structured-data.service'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private postsFacade: PostsFacade, private structuredDataService: StructuredDataService) {}

  posts$ = this.postsFacade.posts$
  isLoading$ = this.postsFacade.isLoading$

  structuredData0 = this.structuredDataService.addWebSite()
  structuredData1 = this.structuredDataService.addBreadcrumb([{ item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' }])

  ngOnInit() {
    this.postsFacade.loadInitPage()
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
    this.structuredDataService.removeStructuredData(this.structuredData1)
  }

  trackByFn(item) {
    return item.id
  }

  nextPage() {
    this.postsFacade.loadNextPage()
  }
}
