import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompetitionRoutingModule } from './competition-routing.module'
import { CompetitionComponent } from './competition.component'
import { MdcButtonModule, MdcTextFieldModule, MdcTypographyModule } from '@angular-mdc/web'
import { KatexModule } from 'ng-katex';
import { TimerComponent } from './components/timer/timer.component'

@NgModule({
  declarations: [CompetitionComponent, TimerComponent],
  imports: [CommonModule, CompetitionRoutingModule, MdcTypographyModule, MdcButtonModule, MdcTextFieldModule, KatexModule],
})
export class CompetitionModule {}
