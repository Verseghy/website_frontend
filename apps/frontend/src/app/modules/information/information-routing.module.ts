import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationComponent } from './components/information/information.component'

const routes: Routes = [
  {
    path: ':slug',
    component: InformationComponent,
    data: { type: 'slug' }
  },
  {
    path: '',
    component: InformationComponent,
    data: { type: 'default' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
