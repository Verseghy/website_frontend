import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SearchComponent } from './components/search/search.component'

const routes: Routes = [
  {
    path: 'term/:term',
    component: SearchComponent,
    data: { type: 'term' },
  },
  {
    path: 'label/:labelID',
    component: SearchComponent,
    data: { type: 'label' },
  },
  {
    path: 'author/:authorID',
    component: SearchComponent,
    data: { type: 'author' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
