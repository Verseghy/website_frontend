import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'verseghy-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  constructor() {}
}
