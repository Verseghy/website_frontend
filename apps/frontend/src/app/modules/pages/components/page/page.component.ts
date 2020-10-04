import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'
import { of } from 'rxjs'
import { DomSanitizer, Title } from '@angular/platform-browser'
import { SubSink } from 'subsink'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  private subsink = new SubSink()

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  data$ = of({"id":1,"template":"services","name":"Test Page","title":"Test","slug":"test","content":"<p>seatdfbsdfg<\/p>","extras":{"meta_title":null,"meta_description":null,"meta_keywords":null},"created_at":"2020-10-04T13:21:12.000000Z","updated_at":"2020-10-04T13:21:12.000000Z","deleted_at":null})
  content$ = this.data$.pipe(
    map(data => {
      return this.domSanitizer.bypassSecurityTrustHtml(data.content)
    })
  )

  constructor(
    private route: ActivatedRoute,
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
