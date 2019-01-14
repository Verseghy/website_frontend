import { Component, OnInit } from '@angular/core'
import { Settings } from '@verseghy/calendar'

@Component({
  selector: 'verseghy-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  calendarSettings: Settings = {
    shortDayNames: [
      'Hé',
      'Ke',
      'Sze',
      'Csüt',
      'Pé',
      'Szo',
      'Vas'
    ]
  }

  constructor() {}

  ngOnInit() {}
}
