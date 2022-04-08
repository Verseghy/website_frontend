import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { combineLatest, Observable, throwError } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { format } from 'date-fns'
import { TitleService } from '../../../../services/title.service'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'verseghy-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  post$: Observable<Post>
  @ViewChild('slideshow') slideshow: any
  fullscreen = false

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: TitleService,
    private metaService: Meta
  ) {}

  ngOnInit() {
    const hack = setInterval(() => {}, 1000)
    this.post$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(([params, queryParams]) => ({ params, queryParams })),
      switchMap((x) => {
        const id = parseInt(x.params.id, 10)
        if (x.queryParams.token) {
          return this.requestService.getPostByIdPreview(id, x.queryParams.token)
        } else {
          return this.requestService.getPostById(id)
        }
      }),
      catchError((error) => {
        clearInterval(hack)
        this.router.navigate(['/404'])
        return throwError(error)
      }),
      tap((post: Post | null) => {
        if (!post) {
          clearInterval(hack)
          this.router.navigate(['/404'])
          return
        }

        this.titleService.setTitle(post.title)

        this.metaService.removeTag('property="og:type"')
        this.metaService.removeTag('property="og:image"')
        this.metaService.removeTag('property="og:description"')
        this.metaService.addTags([
          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: post.title },
          { property: 'og:image', content: post.indexImage },
          { property: 'og:description', content: post.description },
          { property: 'article:author', content: post.author.name },
          { property: 'article:published_time', content: post.date },
          ...post.labels.map((l) => ({ property: 'article:tag', content: l.name })),
        ])
        clearInterval(hack)
      })
    )
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
