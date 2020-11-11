import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { RequestService } from '../../services/request.service'
import { Subject, throwError } from 'rxjs'
import { TitleService } from '../../../../services/title.service'
import { PageData } from '../../../../models/page'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent {
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private router: Router,
    private titleService: TitleService
  ) {}

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  data$ = this.slug$.pipe(
    switchMap((slug) => this.requestService.getPageBySlug(slug)),
    tap(() => this.error$.next(false)),
    catchError((error) => {
      this.error$.next(true)
      this.router.navigate(['/404'])
      return throwError(error)
    }),
    tap((page: PageData | null) => {
      if (!page) return

      this.titleService.setTitle(page.title)
    })
  )
  error$ = new Subject<boolean>()
}
