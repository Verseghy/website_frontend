import { Component, OnInit } from '@angular/core'
import { CalendarEvent, Settings } from '@verseghy/calendar'
import { EVENTS_FEATURE_KEY, EventsState } from '../../reducer/events.reducer'
import { select, Store } from '@ngrx/store'
import { MonthChange } from '../../reducer/events.actions'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'verseghy-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  calendarSettings: Settings = {
    today: 'Ma',
    moreEvent: 'Több esemény',
  }
  calendarEvents: Observable<CalendarEvent[]>

  constructor(private store: Store<EventsState>) {}

  ngOnInit() {
    this.calendarEvents = this.store.pipe(
      select(EVENTS_FEATURE_KEY),
      map((data: EventsState) => {
        let calendarEvents: CalendarEvent[] = []
        for (const item of data.list) {
          calendarEvents = [...calendarEvents, {id: item.id, title: item.title, description: item.description, startDate: new Date(item.date_from), endDate: new Date(item.date_to), color: item.color}]
        }
        return calendarEvents
      })
    )
  }

  onMonthChange(value: { year: number; month: number }) {
    value.month++
    this.store.dispatch(new MonthChange(value))
  }
}
