import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service'
import { Observable } from 'rxjs'
import { Post } from '../../../../models/Post'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Observable<Post[]>
  constructor(private router: Router, private requestService: RequestService) {}

  ngOnInit() {
    this.posts = this.requestService.listPosts(0)
  }

  trackByFn(item) {
    return item.id
  }
}
