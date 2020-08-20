import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompetitionsRoutingModule } from './competitions-routing.module'
import { HomeComponent } from './components/home/home.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import * as fromCompetitions from './state/competitions/competitions.reducer'
import { CompetitionsEffects } from './state/competitions/competitions.effects'
import { CompetitionsFacade } from './state/competitions/competitions.facade'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CompetitionsRoutingModule,
    StoreModule.forFeature(fromCompetitions.COMPETITIONS_FEATURE_KEY, fromCompetitions.reducer),
    EffectsModule.forFeature([CompetitionsEffects]),
  ],
  providers: [CompetitionsFacade],
})
export class CompetitionsModule {}
