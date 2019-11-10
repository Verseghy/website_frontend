import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ArchiveScreenComponent } from './archive-screen.component'

const routes: Routes = [
  {
    path: '',
    component: ArchiveScreenComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchiveRoutingModule {}
