import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AfterscreenComponent } from './components/afterscreen/afterscreen.component'
import { RouterModule, Routes } from '@angular/router'
import { MdcTypographyModule } from '@angular-mdc/web'

const routes: Routes = [
  {
    path: '',
    component: AfterscreenComponent,
  },
]

@NgModule({
  declarations: [AfterscreenComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MdcTypographyModule],
})
export class AfterModule {}
