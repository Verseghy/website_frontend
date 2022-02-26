import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { CanteenComponent } from './components/canteen/canteen.component'

const routes: Routes = [
  {
    path: '',
    component: CanteenComponent,
  },
]

@NgModule({
  declarations: [CanteenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class CanteenModule {}
