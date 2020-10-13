import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { InformationFacade } from '../../state/information/information.facade'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'

@Component({
  selector: 'verseghy-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  @ViewChild('scroll') renderer: ElementRef

  error$ = this.informationFacade.error$
  menu$ = this.informationFacade.menu$
  loadedPage$ = this.informationFacade.loadedPage$
  loadedMenu$ = this.informationFacade.loadedMenu$

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  page$ = combineLatest([this.informationFacade.page$, this.slug$]).pipe(
    switchMap(([page, slug]) => {
      if (!page && slug) {
        this.informationFacade.queryPageBySlug(slug)
        return of()
      }

      return of(page)
    })
  )

  constructor(private route: ActivatedRoute, private informationFacade: InformationFacade) {}

  ngOnInit(): void {
    this.informationFacade.queryMenu()
  }
}
