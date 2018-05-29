import 'moment/locale/hu';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';
import { Router } from '@angular/router';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import * as moment from 'moment';
import { first, map } from 'rxjs/operators';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[];
  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
  ) {}

  ngOnInit() {
    moment.locale('hu');
    this.afStore
      .collection<Post>('posts')
      .valueChanges()
      .pipe(
        map(async x => {
          for (const i of Object.keys(x)) {
            x[i].dateAgo = moment(x[i].date.toDate())
              .fromNow()
              .toString();
            x[i].authorImage = await this.afStorage
              .ref('authors/' + x[i].authorImage)
              .getDownloadURL()
              .pipe(first())
              .toPromise();
            x[i].image = await this.afStorage
              .ref('posts/' + x[i].image)
              .getDownloadURL()
              .pipe(first())
              .toPromise();
          }
          return x;
        }),
      )
      .subscribe(x => {
        x.then(y => {
          this.posts = y;
        });
      });
  }

  trackByFn(item) {
    return item.id;
  }

  _onClick(id) {
    this.router.navigate(['posts', id]);
  }
}
