import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './components/search/search.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromSearch from './state/search/search.reducer'
import { SearchEffects } from './state/search/search.effects'
import { SearchFacade } from './state/search/search.facade'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    StoreModule.forFeature(fromSearch.SEARCH_FEATURE_KEY, fromSearch.reducer),
    EffectsModule.forFeature([SearchEffects]),
    SharedModule,
  ],
  providers: [SearchFacade],
})
export class SearchModule {}
