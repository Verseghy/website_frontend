import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { EditComponent } from './components/edit/edit.component'
import { ListComponent } from './components/list/list.component'

@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
