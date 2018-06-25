import 'moment/locale/hu';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

/* interface Post {
  id: number;
  author: string;
  authorImage: string;
  date: Date;
  dateAgo: string;
  description: string;
  image: string;
  post: string;
  title: string;
  backgroundColor: string;
  isDark: boolean;
  type: number;
  labels: {
    title: string;
    backgroundColor: string;
    isDark: boolean;
  }
}*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /* tslint:disable */
  posts = [{ id: 0, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 1, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 2, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 3, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 4, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#193b5b', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 5, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 6, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#193b5b', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 7, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 8, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#ccc', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 9, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { id: 10, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 }];
  /* tslint:enable */

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    moment.locale('hu');
  }

  trackByFn(item) {
    return item.id;
  }

  _onClick(id) {
    this.router.navigate(['posts', id]);
  }
}
