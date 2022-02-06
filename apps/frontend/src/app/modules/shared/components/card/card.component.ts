import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Post } from '../../../../models/Post'
import { format } from 'date-fns'
import * as Color from 'color'

@Component({
  selector: 'verseghy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() type = 0
  @Input() post: Post

  constructor() {}

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }

  get color(): string {
    const hue = Math.floor(Color(this.post.color).hue() / 30) * 30
    return Color.hsl([hue, 100, 80]).toString()
  }
}
