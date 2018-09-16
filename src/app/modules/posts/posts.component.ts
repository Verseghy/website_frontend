import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestService } from './services/request.service';
import { Post } from '../../models/Post';
import { ActivatedRoute } from '@angular/router';
import { ContrastService } from '../../services/contrast.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  post: Post;

  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private contrastService: ContrastService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(x => {
      this.requestService.getPostById(x['id']).pipe(map(y => {
        for (const i of Object.keys(y.labels)) {
          y.labels[i].isDark = this.contrastService.getConstrast(y.labels[i].color);
        }
        return y;
      })).subscribe(post => this.post = post);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
