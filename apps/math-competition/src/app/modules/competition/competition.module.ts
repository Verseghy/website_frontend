import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CompetitionRoutingModule } from './competition-routing.module'
import { CompetitionComponent } from './competition.component'
import { KatexModule } from 'ng-katex'
import { TimerComponent } from './components/timer/timer.component'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [CompetitionComponent, TimerComponent],
  imports: [CommonModule, CompetitionRoutingModule, KatexModule, AngularFireStorageModule, SharedModule],
})
export class CompetitionModule {}
