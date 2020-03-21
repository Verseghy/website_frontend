import { Component, Input, OnInit } from '@angular/core'
import { ContrastService } from '../../../../services/contrast.service'
import { Post } from '../../../../models/Post'
import { format } from 'date-fns'
import cloneDeep from 'lodash-es/cloneDeep'

@Component({
  selector: 'verseghy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() type = 0
  @Input() post: Post

  constructor() {}

  get contrastedPost() {
    const post = cloneDeep(this.post)

    post.backgroundDark = ContrastService.getConstrast(this.post.color)
    for (const i of Object.keys(this.post.labels)) {
      post.labels[i].backgroundDark = ContrastService.getConstrast(this.post.labels[i].color)
    }

    return post
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }
}
