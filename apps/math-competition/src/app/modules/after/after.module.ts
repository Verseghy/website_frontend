import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AfterscreenComponent } from './components/afterscreen/afterscreen.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: AfterscreenComponent,
  },
]

@NgModule({
  declarations: [AfterscreenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AfterModule {}
