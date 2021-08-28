import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { InformationFacade } from '../../state/information/information.facade'
import { ActivatedRoute, Router } from '@angular/router'
import { map, switchMap, tap } from 'rxjs/operators'
import { combineLatest, of } from 'rxjs'
import { SubSink } from 'subsink'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { PageData } from '../../../../models/page'
import { TitleService } from '../../../../services/title.service'

@Component({
  selector: 'verseghy-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent implements OnInit, OnDestroy {
  @ViewChild('scroll') renderer: ElementRef

  error$ = this.informationFacade.error$
  menu$ = this.informationFacade.menu$
  loadedPage$ = this.informationFacade.loadedPage$
  loadedMenu$ = this.informationFacade.loadedMenu$

  structuredData0 = null
  prevSlug = ''

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  page$ = combineLatest([this.informationFacade.page$, this.slug$]).pipe(
    switchMap(([page, slug]) => {
      if (slug && slug !== this.prevSlug) {
        this.prevSlug = slug
        this.informationFacade.queryPageBySlug(slug)
        return of()
      }

      return of(page)
    }),
    tap((page: PageData | null) => {
      if (!page) return

      this.titleService.setTitle(page.title)

      if (this.structuredData0 != null) this.structuredDataService.removeStructuredData(this.structuredData0)
      this.structuredData0 = this.structuredDataService.addBreadcrumb([
        { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
        { item: 'https://verseghy-gimnazium.net/information/', position: 1, name: 'Információk' },
        { item: `https://verseghy-gimnazium.net/information/${page.slug}`, position: 2, name: page.title },
      ])
    })
  )

  private _subs = new SubSink()

  constructor(
    private route: ActivatedRoute,
    private informationFacade: InformationFacade,
    private structuredDataService: StructuredDataService,
    private router: Router,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.informationFacade.queryMenu()
    this._subs.sink = this.error$.subscribe((error) => {
      if (error) this.router.navigate(['/404'])
    })
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe()
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }
}
