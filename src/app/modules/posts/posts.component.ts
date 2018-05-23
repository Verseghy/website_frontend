import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import * as Remarkable from 'remarkable';

interface Post {
  id: number,
  author: string,
  authorImage: string,
  date: Timestamp,
  dateAgo: string,
  description: string,
  image: string,
  post: string,
  title: string
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostsComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  post: SafeHtml;

  constructor(private route: ActivatedRoute,
              private afStore: AngularFirestore,
              private afStorage: AngularFireStorage,
              private sanitizer: DomSanitizer
              ) { }

  ngOnInit() {
    let md = new Remarkable();
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.afStore.collection<Post>('posts', ref => ref.where('id', '==', parseInt(params.id))).valueChanges().subscribe(x => {
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
