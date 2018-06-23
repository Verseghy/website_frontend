import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-post',
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.css']
})
export class FeaturedPostComponent implements OnInit {

  /* tslint:disable */
  posts = [{ image: 'http://verseghy-gimnazium.net/images/hirek/607_005.jpg', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 },
  { image: 'http://verseghy-gimnazium.net/images/hirek/607_004.jpg', author: 'TwoDCube', id: 0, title: 'Lorem Ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat ex quis erat fermentum, non faucibus dolor sagittis. Cras egestas orci nisi, sed luctus mauris iaculis sit amet. Vestibulum pretium congue ante ac elementum', authorImage: 'https://firebasestorage.googleapis.com/v0/b/vfghonlap-001.appspot.com/o/authors%2Fauth0.jpg?alt=media&token=7d1d2600-e72b-499f-be0e-4dd9bb2d190c', dateAgo: '30 napja', backgroundColor: '#fff', labels: [{ title: 'label1', backgroundColor: '#a66bbe' }, { title: 'label1', backgroundColor: '#61c437' }], type: 0 }];
  /* tslint:enable */

  constructor() { }
  ngOnInit() {
  }

}
