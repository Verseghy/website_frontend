import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RequestService } from './services/request.service';
import { Post } from '../../interfaces/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  post: Observable<Post>;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(x => {
      this.post = this.requestService.getPostById(x['id']);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
