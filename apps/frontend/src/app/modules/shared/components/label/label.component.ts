import { Component, Input } from '@angular/core'
import { Label } from '../../../../models/Post'
import * as colorParser from 'parse-color'

@Component({
  selector: 'verseghy-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  @Input() label: Label

  constructor() {}

  get isDark(): boolean {
    const rgb = colorParser(this.label.color).rgb
    const o = Math.round((parseInt(rgb[0], 10) * 299 + parseInt(rgb[1], 10) * 587 + parseInt(rgb[2], 10) * 114) / 1000)
    return o <= 125
  }
}
