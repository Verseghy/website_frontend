import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { format } from 'date-fns'

@Component({
  selector: 'verseghy-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  post$: Observable<Post>
  @ViewChild('slideshow') slideshow: any

  constructor(private requestService: RequestService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.post$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(([params, queryParams]) => ({ params, queryParams })),
      switchMap((x) => {
        if (x.queryParams.token) {
          return this.requestService.getPostByIdPreview(x.params.id, x.queryParams.token)
        } else {
          return this.requestService.getPostById(x.params.id)
        }
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
