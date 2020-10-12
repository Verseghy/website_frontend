import { Component, OnInit } from '@angular/core'
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
  error$ = this.informationFacade.error$ // TODO(tiborszepesi): implement errorhandling
  menu$ = this.informationFacade.menu$
  loadedPage$ = this.informationFacade.loadedPage$ // TODO(tiborszepesi): implement loading
  loadedMenu$ = this.informationFacade.loadedMenu$ // TODO(tiborszepesi): implement loading

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
