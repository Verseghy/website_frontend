import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EndRoutingModule } from './end-routing.module'
import { EndComponent } from './end.component'

@NgModule({
  declarations: [EndComponent],
  imports: [CommonModule, EndRoutingModule],
})
export class EndModule {}
