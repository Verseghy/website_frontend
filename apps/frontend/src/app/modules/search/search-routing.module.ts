import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component'

const routes: Routes = [
  {
    path: 'term/:term',
    component: SearchComponent,
    data: { type: 'term' }
  },
  {
    path: 'label/:term',
    component: SearchComponent,
    data: { type: 'label' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
