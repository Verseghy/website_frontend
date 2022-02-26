import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { Event, Settings } from '@verseghy/calendar'
import { EVENTS_FEATURE_KEY, EventsState } from '../../reducer/events.reducer'
import { select, Store } from '@ngrx/store'
import { MonthChange } from '../../reducer/events.actions'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { StructuredDataService } from '../../../../services/structured-data.service'
import { TitleService } from '../../../../services/title.service'

@Component({
  selector: 'verseghy-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit, OnDestroy {
  calendarSettings: Settings = {
    shortDayNames: ['Hé', 'Ke', 'Sze', 'Csüt', 'Pé', 'Szo', 'Vas'],
    shortMonthNames: ['Jan', 'Febr', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'],
    monthNames: [
      'Január',
      'Február',
      'Március',
      'Április',
      'Május',
      'Június',
      'Július',
      'Augusztus',
      'Szeptember',
      'Október',
      'November',
      'December',
    ],
    today: 'Ma',
    moreEvent: 'Több esemény',
  }
  calendarEvents: Observable<Event[]>

  structuredData0 = this.structuredDataService.addBreadcrumb([
    { item: 'https://verseghy-gimnazium.net/', position: 0, name: 'Főoldal' },
    { item: 'https://verseghy-gimnazium.net/events', position: 1, name: 'Menza' },
  ])

  constructor(
    private store: Store<EventsState>,
    private structuredDataService: StructuredDataService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Események')
    this.calendarEvents = this.store.pipe(
      select((state) => state[EVENTS_FEATURE_KEY]),
      map((data: EventsState) => {
        let calendarEvents: Event[] = []
        for (const item of data.list) {
          calendarEvents = [...calendarEvents, new Event(item.id, item.title, item.description, item.dateFrom, item.dateTo, item.color)]
        }
        return calendarEvents
      })
    )
  }

  ngOnDestroy() {
    this.structuredDataService.removeStructuredData(this.structuredData0)
  }

  onMonthChange(value: { year: number; month: number }) {
    value.month++
    this.store.dispatch(new MonthChange(value))
  }
}
