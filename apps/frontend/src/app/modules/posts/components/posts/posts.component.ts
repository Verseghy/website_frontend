import { Component, OnInit, SecurityContext } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { RequestService } from '../../services/request.service'
import { Post } from '../../../../models/Post'
import { ActivatedRoute } from '@angular/router'
import { ContrastService } from '../../../../services/contrast.service'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'verseghy-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  post$: Observable<Post>

  constructor(private requestService: RequestService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.post$ = combineLatest([this.route.params, this.route.queryParams]).pipe(
      map(([params, queryParams]) => ({params, queryParams})),
      switchMap(x => {
        if (x.queryParams.token) {
          return this.requestService.getPostByIdPreview(x.params.id, x.queryParams.token)
        } else {
          return this.requestService.getPostById(x.params.id)
        }
      }),
      map(x => {
          for (const i of Object.keys(x.labels)) {
            x.labels[i].isDark = ContrastService.getConstrast(x.labels[i].color)
          }
          x.content = this.sanitizer.bypassSecurityTrustHtml(<string> x.content)
          return x
      })
    )
  }
}
