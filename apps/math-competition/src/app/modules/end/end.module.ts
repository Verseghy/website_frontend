import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EndRoutingModule } from './end-routing.module'
import { EndComponent } from './end.component'
import { MdcTypographyModule } from '@angular-mdc/web'

@NgModule({
  declarations: [EndComponent],
  imports: [CommonModule, EndRoutingModule, MdcTypographyModule],
})
export class EndModule {}
