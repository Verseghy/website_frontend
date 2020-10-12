import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InformationComponent } from './components/information/information.component'
import { EmptyInformationPathGuard } from './guards/empty-information-path.guard'

const routes: Routes = [
  {
    path: ':slug',
    component: InformationComponent,
  },
  {
    path: '',
    canActivate: [EmptyInformationPathGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmptyInformationPathGuard],
})
export class InformationRoutingModule {}
