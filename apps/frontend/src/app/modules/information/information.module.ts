import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './components/information/information.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [InformationComponent, SidebarComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    SharedModule,
  ],
})
export class InformationModule { }
