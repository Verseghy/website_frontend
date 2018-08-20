import { Component, OnInit, Input } from '@angular/core';
import { ContrastService } from '../../../../services/contrast.service';
import { Post } from '../../../../interfaces/Post';

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
    this.post.backgroundDark = this.contrastService.getConstrast(this.post.color);
    for (const i of Object.keys(this.post.labels)) {
      this.post.labels[i].backgroundDark = this.contrastService.getConstrast(this.post.labels[i].color);
    }
  }

}
