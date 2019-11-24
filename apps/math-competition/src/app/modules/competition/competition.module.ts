import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompetitionRoutingModule } from './competition-routing.module'
import { CompetitionComponent } from './competition.component'
import { MdcButtonModule, MdcTextFieldModule, MdcTypographyModule } from '@angular-mdc/web'
import { KatexModule } from 'ng-katex'

@NgModule({
  declarations: [CompetitionComponent],
  imports: [CommonModule, CompetitionRoutingModule, MdcTypographyModule, MdcButtonModule, MdcTextFieldModule, KatexModule],
})
export class CompetitionModule {}
