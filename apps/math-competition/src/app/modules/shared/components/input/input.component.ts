import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'verseghy-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text'
  value = ''
  disabled = false
  onChanged: any = () => {}
  onTouched: any = () => {}

  constructor() {}

  registerOnChange(fn: any): void {
    this.onChanged = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  writeValue(obj: any): void {
    this.value = obj
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
