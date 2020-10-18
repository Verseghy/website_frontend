import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Title } from '@angular/platform-browser'
import { SubSink } from 'subsink'
import { RequestService } from '../../services/request.service'
import { Subject, throwError } from 'rxjs'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private requestService: RequestService, private titleService: Title) {}

  private subsink = new SubSink()

  slug$ = this.route.params.pipe(map(({ slug }) => slug))
  data$ = this.slug$.pipe(
    switchMap((slug) => this.requestService.getPageBySlug(slug)),
    tap(() => this.error$.next(false)),
    catchError((error) => {
      this.error$.next(true)
      return throwError(error)
    })
  )
  error$ = new Subject<boolean>()

  ngOnInit(): void {
    this.subsink.sink = this.data$.subscribe((data) => {
      // this.titleService.setTitle(data.title)
    })
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe()
  }
}
