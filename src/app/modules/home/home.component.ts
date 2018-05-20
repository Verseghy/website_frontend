import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts = [
    {
      id: 0,
      title: 'Title0',
      date: '2018-06-06 15:15:15',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa velit. Etiam ultrices ac urna elementum euismod.',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      title: 'Title1',
      date: '2018-06-06 15:15:15',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa velit. Etiam ultrices ac urna elementum euismod.',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 2,
      title: 'Title2',
      date: '2018-06-06 15:15:15',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac massa velit. Etiam ultrices ac urna elementum euismod.',
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
