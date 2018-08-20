import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsComponent} from './components/events/events.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsComponent]
})
export class EventsModule {
}
