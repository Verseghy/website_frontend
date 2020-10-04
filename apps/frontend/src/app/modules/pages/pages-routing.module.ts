import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageComponent } from './components/page/page.component'

const routes: Routes = [
  {
    path: ':slug',
    component: PageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
