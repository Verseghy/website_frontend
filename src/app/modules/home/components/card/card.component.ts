import { Component, OnInit, Input } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';
import { ContrastService } from '../../../../services/contrast.service';

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
  backgroundColor: string;
  isDark: boolean;
  labels: {
    title: string;
    backgroundColor: string;
    isDark: boolean;
  }
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  @Input() type = 0;
  @Input() post: Post;

  constructor(private contrastService: ContrastService) { }

  ngOnInit() {
    this.post.isDark = this.contrastService.getConstrast(this.post.backgroundColor);
    for (let i in this.post.labels) {
      this.post.labels[i].isDark = this.contrastService.getConstrast(this.post.labels[i].backgroundColor);
    }
  }

}
