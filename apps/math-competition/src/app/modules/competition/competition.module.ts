import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionComponent } from './competition.component';
import { MdcButtonModule, MdcTextFieldModule, MdcTypographyModule } from '@angular-mdc/web'
import { ScrollingModule } from '@angular/cdk/scrolling'


@NgModule({
  declarations: [CompetitionComponent],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    MdcTypographyModule,
    MdcButtonModule,
    MdcTextFieldModule,
  ],
})
export class CompetitionModule { }
