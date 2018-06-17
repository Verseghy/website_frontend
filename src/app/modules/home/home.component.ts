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
  posts = [{ id: 0, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 1, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 2, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 3, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 4, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: 'red', dark: true, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 5, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 6, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: 'blue', dark: true, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 7, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 8, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#ccc', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 9, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] },
  { id: 10, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', bgColor: '#fff', dark: false, labels: [{ title: 'label1', color: 'red' }, { title: 'label1', color: 'blue' }] }];
  @ViewChild(MatRipple) ripple: MatRipple;

  constructor(
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
  ) { }

  ngOnInit() {
    moment.locale('hu');
    /*this.afStore
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
      });*/
  }

  trackByFn(item) {
    return item.id;
  }

  _onClick(id) {
    this.router.navigate(['posts', id]);
  }
}
