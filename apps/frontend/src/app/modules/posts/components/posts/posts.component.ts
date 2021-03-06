import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { combineLatest, Observable, throwError } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { format } from 'date-fns'
import { TitleService } from '../../../../services/title.service'

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
    private titleService: TitleService
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
      catchError((error) => {
        this.router.navigate(['/404'])
        return throwError(error)
      }),
      tap((post: Post | null) => {
        if (!post) return

        this.titleService.setTitle(post.title)
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
