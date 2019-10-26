import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';


@NgModule({
  declarations: [CompetitionComponent],
  imports: [
    CommonModule,
    CompetitionRoutingModule
  ]
})
export class CompetitionModule { }
