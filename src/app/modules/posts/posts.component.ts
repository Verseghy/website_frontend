import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

/*interface Post {
  id: number;
  author: string;
  authorImage: string;
  date: Date;
  dateAgo: string;
  description: string;
  image: string;
  post: string;
  title: string;
}*/

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
