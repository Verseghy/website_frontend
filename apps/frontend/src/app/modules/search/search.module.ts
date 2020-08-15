import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';


@NgModule({
  declarations: [SearchComponent, CardComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
