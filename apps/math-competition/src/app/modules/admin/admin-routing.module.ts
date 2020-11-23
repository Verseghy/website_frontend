import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListComponent } from './components/list/list.component'

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
