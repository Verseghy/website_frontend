import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFirestore } from 'angularfire2/firestore';
import * as MarkdownIt from 'markdown-it';
import * as MarkdownItMultimd from 'markdown-it-multimd-table';
import { Subscription } from 'rxjs';

interface Post {
  id: number;
  author: string;
  authorImage: string;
  date: Timestamp;
  dateAgo: string;
  description: string;
  image: string;
  post: string;
  title: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;
  post: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    const md = new MarkdownIt().use(MarkdownItMultimd, {
      enableMultilineRows: true,
    });
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.afStore
        .collection<Post>('posts', ref => ref.where('id', '==', parseInt(params.id, 10)))
        .valueChanges()
        .subscribe(x => {
          x.forEach(y => {
            this.post = this.sanitizer.sanitize(0, md.render(y.post));
          });
        });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
