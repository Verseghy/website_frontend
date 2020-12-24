import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'

@Component({
  selector: 'verseghy-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnChanges {
  checked = false

  @Input() value = false
  @Output() change = new EventEmitter<boolean>()

  constructor() {}

  clickHandler(): void {
    this.checked = !this.checked
    this.change.emit(this.checked)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.checked = this.value
    }
  }
}
