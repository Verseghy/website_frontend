import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'verseghy-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() type = 'text'
  constructor() {}
}
