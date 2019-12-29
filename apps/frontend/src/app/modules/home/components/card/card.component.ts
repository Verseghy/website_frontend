import { Component, Input, OnInit } from '@angular/core'
import { ContrastService } from '../../../../services/contrast.service'
import { Post } from '../../../../models/Post'
import { format } from 'date-fns'

@Component({
  selector: 'verseghy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() type = 0
  @Input() post: Post

  constructor() {}

  ngOnInit() {
    this.post.backgroundDark = ContrastService.getConstrast(this.post.color)
    for (const i of Object.keys(this.post.labels)) {
      this.post.labels[i].backgroundDark = ContrastService.getConstrast(this.post.labels[i].color)
    }
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }
}
