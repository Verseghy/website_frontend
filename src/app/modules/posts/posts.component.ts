import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
