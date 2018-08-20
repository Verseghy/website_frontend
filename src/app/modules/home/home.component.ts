import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from './services/request.service';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  posts: Observable<Post[]>;
  constructor(
    private router: Router,
    private requestService: RequestService,
  ) { }

  ngOnInit() {
    this.posts = this.requestService.listPosts();
  }

  trackByFn(item) {
    return item.id;
  }

  _onClick(id) { // TODO: fix this
    this.router.navigate(['posts', id]);
  }
}
