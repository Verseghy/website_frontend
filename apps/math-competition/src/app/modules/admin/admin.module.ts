import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { ListComponent } from './components/list/list.component'
import { KatexModule } from 'ng-katex'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, AdminRoutingModule, MatSelectModule, MatPaginatorModule, KatexModule],
})
export class AdminModule {}
