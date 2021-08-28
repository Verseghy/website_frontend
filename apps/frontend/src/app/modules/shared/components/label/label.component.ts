import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import * as Color from 'color'
import { Label } from '../../../../models/Post'

@Component({
  selector: 'verseghy-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  @Input() label: Label

  constructor() {}

  get isDark(): boolean {
    return Color(this.label.color).contrast(Color('#000')) < 4.5
  }
}
