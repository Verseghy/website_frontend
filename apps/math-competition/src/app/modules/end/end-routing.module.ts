import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { EndComponent } from './end.component'

const routes: Routes = [{ path: '', component: EndComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndRoutingModule {}
