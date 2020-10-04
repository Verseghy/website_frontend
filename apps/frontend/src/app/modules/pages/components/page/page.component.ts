import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { DomSanitizer, Title } from '@angular/platform-browser'
import { SubSink } from 'subsink'
import { RequestService } from '../../services/request.service'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  private subsink = new SubSink()

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  data$ = this.slug$.pipe(
    switchMap(slug => this.requestService.getPageBySlug(slug))
  )
  content$ = this.data$.pipe(
    map(data => {
      return this.domSanitizer.bypassSecurityTrustHtml(data.content)
    })
  )

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private titleService: Title,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {


    this.subsink.sink = this.data$.subscribe(data => {
      this.titleService.setTitle(data.title)
    })
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe()
  }

}
