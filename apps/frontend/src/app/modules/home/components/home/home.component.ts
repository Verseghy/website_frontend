import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service'
import { Observable } from 'rxjs'
import { Post } from '../../../../models/Post'
import { PostsFacade } from '../../state/posts/posts.facade'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private postsFacade: PostsFacade) {}

  posts = this.postsFacade.posts$
  isLoading$ = this.postsFacade.isLoading$

  ngOnInit() {
    this.postsFacade.loadInitPage()
  }

  trackByFn(item) {
    return item.id
  }

  nextPage() {
    this.postsFacade.loadNextPage()
  }
}
