import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { ButtonComponent } from './components/button/button.component'
import { InputDirective } from './directives/input.directive'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [CheckboxComponent, ButtonComponent, InputDirective],
  imports: [CommonModule, FormsModule],
  exports: [CheckboxComponent, ButtonComponent, InputDirective],
})
export class SharedModule {}
