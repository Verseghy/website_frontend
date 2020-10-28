import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, tap } from 'rxjs/operators'
import { format } from 'date-fns'
import { StructuredDataService } from '../../../../services/structured-data.service'

@Component({
  selector: 'verseghy-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  post$: Observable<Post>
  @ViewChild('slideshow') slideshow: any

  structuredData0: number = null
  structuredData1: number = null

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit() {
    this.post$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(([params, queryParams]) => ({ params, queryParams })),
      switchMap((x) => {
        if (x.queryParams.token) {
          return this.requestService.getPostByIdPreview(x.params.id, x.queryParams.token)
        } else {
          return this.requestService.getPostById(x.params.id)
        }
      }),
      tap((post) => {
        if (this.structuredData0) this.structuredDataService.removeStructuredData(this.structuredData0)
        this.structuredData0 = this.structuredDataService.addArticle({
          headline: post.title,
          images: [post.index_image],
          dateModified: '',
          datePublished: post.date,
        })

        if (this.structuredData1) this.structuredDataService.removeStructuredData(this.structuredData1)
        this.structuredData1 = this.structuredDataService.addBreadcrumb([
          { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
          { item: `https://verseghy-gimnazium.net/posts/${post.id}`, position: 1, name: post.title },
        ])
      })
    )
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
    this.structuredDataService.removeStructuredData(this.structuredData1)
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === 'ArrowRight') {
      this.slideshow.onSlide(1)
    } else if (event.code === 'ArrowLeft') {
      this.slideshow.onSlide(-1)
    }
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }
}
