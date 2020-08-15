import { Component, Input, OnInit } from '@angular/core'
import { Post } from '../../../../models/Post'
import { format } from 'date-fns'

@Component({
  selector: 'verseghy-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() post: Post

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date: string): string {
    return format(new Date(date), 'YYYY-MM-DD')
  }

  getHueFromHEXColor(color: string): number {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)

    let r = parseInt(result[1], 16)
    let g = parseInt(result[2], 16)
    let b = parseInt(result[3], 16)
    ;(r /= 255), (g /= 255), (b /= 255)
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b)
    let h = (max + min) / 2
    let s = (max + min) / 2
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return Math.round(360 * h)
  }

}
