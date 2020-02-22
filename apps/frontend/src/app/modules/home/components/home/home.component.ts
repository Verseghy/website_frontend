import { Component, OnInit } from '@angular/core'
import { PostsFacade } from '../../state/posts/posts.facade'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private postsFacade: PostsFacade) {}

  posts$ = this.postsFacade.posts$
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
