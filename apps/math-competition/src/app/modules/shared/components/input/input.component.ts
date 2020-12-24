import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'verseghy-input',
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  constructor() {}
}
