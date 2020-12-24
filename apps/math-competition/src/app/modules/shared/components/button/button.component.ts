import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'verseghy-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() outlined = false

  constructor() {}
}
