import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { ButtonComponent } from './components/button/button.component'
import { InputComponent } from './components/input/input.component'

@NgModule({
  declarations: [CheckboxComponent, ButtonComponent, InputComponent],
  imports: [CommonModule],
  exports: [CheckboxComponent, ButtonComponent, InputComponent],
})
export class SharedModule {}
