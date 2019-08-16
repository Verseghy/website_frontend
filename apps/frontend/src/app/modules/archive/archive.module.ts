import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchiveScreenComponent } from './archive-screen.component';

@NgModule({
  declarations: [ArchiveScreenComponent],
  imports: [
    CommonModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }
