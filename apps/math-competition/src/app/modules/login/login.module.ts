import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginscreenComponent } from './components/loginscreen/loginscreen.component'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MdcButtonModule, MdcTextFieldModule, MdcTypographyModule } from '@angular-mdc/web'
import { SharedModule } from '../shared/shared.module'

const material = [MdcTextFieldModule, MdcTypographyModule, MdcButtonModule]

const routes: Routes = [
  {
    path: '',
    component: LoginscreenComponent,
  },
]

@NgModule({
  declarations: [LoginscreenComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, ...material, SharedModule],
})
export class LoginModule {}
