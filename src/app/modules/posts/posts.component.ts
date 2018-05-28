import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';
import * as MarkdownItMultimd from 'markdown-it-multimd-table';
import { HammerInput } from '@angular/material';

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
  encapsulation: ViewEncapsulation.None,
})
export class PostsComponent implements OnInit, OnDestroy {

  paramsSubscription: Subscription;
  post: SafeHtml;
  @ViewChild('card', {read: ElementRef}) private card: ElementRef;

  constructor(private route: ActivatedRoute,
              private afStore: AngularFirestore,
              private afStorage: AngularFireStorage,
              private sanitizer: DomSanitizer,
              private elRef: ElementRef
              ) { }

  ngOnInit() {
    const md = new MarkdownIt().use(MarkdownItMultimd, {enableMultilineRows: true});
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.afStore.collection<Post>('posts', ref => ref.where('id', '==', parseInt(params.id, 10))).valueChanges().subscribe(x => {
        x.forEach(y => {
          this.post = this.sanitizer.sanitize(0, md.render(y.post));
        });
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  private _onPan(event: HammerInput) {
    if ( event.deltaY > 0 ) {
      this.card.nativeElement.style.transform = 'translateY(' + event.deltaY + 'px)';
    }
  }

  private _onPanEnd(event: HammerInput) {
    if ( this.elRef.nativeElement.clientHeight * 0.4 >= event.deltaY) {
      this.card.nativeElement.style.transform = 'translateY(0)';
    } else {
      this.card.nativeElement.style.transform = 'translateY(' + this.elRef.nativeElement.clientHeight + 'px)';
    }
  }

  private _onPanStart() {
  }

}
