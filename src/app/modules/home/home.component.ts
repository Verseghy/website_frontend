import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Timestamp } from '@firebase/firestore-types';
import { AngularFireStorage } from 'angularfire2/storage';
import * as moment from 'moment';
import 'moment/locale/hu';

interface Post {
  id: number,
  author: string,
  authorImage: string,
  date: Timestamp,
  dateAgo: string,
  description: string,
  image: string,
  title: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Observable<any>;

  constructor(private afStore: AngularFirestore,
              private afStorage: AngularFireStorage
              ) { }

  ngOnInit() {
    moment.locale('hu');
    this.posts = this.afStore.collection<Post>('posts').valueChanges().pipe(map( async (x) => {
      for (let i in x){
        x[i].dateAgo = moment(x[i].date.toDate()).fromNow().toString(); 
        x[i].authorImage = await this.afStorage.ref('authors/'+x[i].authorImage).getDownloadURL().pipe(first()).toPromise();
        x[i].image = await this.afStorage.ref('posts/' + x[i].image).getDownloadURL().pipe(first()).toPromise();
      }
      return x;
    }));
  }

}
