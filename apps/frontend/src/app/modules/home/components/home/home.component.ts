import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service'
import { RequestService as RequestService2 } from '../../../posts/services/request.service'
import { Observable } from 'rxjs'
import { Post } from '../../../../models/Post'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private requestService: RequestService,
    private requestService2: RequestService2
  ) {}

  static init = true
  posts: Observable<Post[]>

  ngOnInit() {
    this.posts = this.requestService.listPosts(0)
    if (HomeComponent.init) {
      this.posts.subscribe(posts => {
        for (const post of posts) {
          this.requestService2.getPostById(post.id.toString(10)).subscribe()
        }
        HomeComponent.init = false
      })
    }
  }

  trackByFn(item) {
    return item.id
  }
}
