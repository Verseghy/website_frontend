import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import * as fromCompetitions from "./state/competitions/competitions.reducer";
import { CompetitionsEffects } from "./state/competitions/competitions.effects";
import { CompetitionsFacade } from "./state/competitions/competitions.facade";
import { InfoComponent } from "./components/info/info.component";
import { HeroComponent } from "./components/hero/hero.component";
import { AboutComponent } from "./components/about/about.component";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { FaqComponent } from "./components/faq/faq.component";
import { RulesComponent } from "./components/rules/rules.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { InViewportModule } from "ng-in-viewport";

@NgModule({
  declarations: [HomeComponent, InfoComponent, HeroComponent, AboutComponent, ScheduleComponent, FaqComponent, RulesComponent, MenuComponent],
  imports: [
    CommonModule,
    CompetitionsRoutingModule,
    FontAwesomeModule,
    InViewportModule,
    StoreModule.forFeature(fromCompetitions.COMPETITIONS_FEATURE_KEY, fromCompetitions.reducer),
    EffectsModule.forFeature([CompetitionsEffects]),
  ],
  providers: [CompetitionsFacade],
})
export class CompetitionsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCalendarAlt)
  }
}
