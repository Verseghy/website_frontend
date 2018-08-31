import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxCalendarLibModule } from '@verseghy/ngx-calendar-lib'

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxCalendarLibModule
  ],
  declarations: [EventsComponent]
})
export class EventsModule {
}
