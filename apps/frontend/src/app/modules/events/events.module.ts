import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventsComponent } from './components/events/events.component'
import { RouterModule, Routes } from '@angular/router'
import { CalendarModule } from '@verseghy/calendar'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { EVENTS_FEATURE_KEY, eventsReducer, initialState as eventsInitialState } from './reducer/events.reducer'
import { EventsEffects } from './reducer/events.effects'

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CalendarModule,
    StoreModule.forFeature(EVENTS_FEATURE_KEY, eventsReducer, { initialState: eventsInitialState }),
    EffectsModule.forFeature([EventsEffects]),
  ],
  declarations: [EventsComponent],
})
export class EventsModule {}
