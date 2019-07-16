import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { EventDetailsPopUpSettings } from './calendar.interfaces'

@Injectable({
  providedIn: 'root',
})
export class NgxCalendarLibService {
  eventDetailsPopUpSettings: EventDetailsPopUpSettings = {
    visible: false,
    top: 0,
    left: 0,
    date: '',
    title: '',
    description: '',
    color: '',
  }
  eventDetailsPopUp$: BehaviorSubject<EventDetailsPopUpSettings> = new BehaviorSubject(this.eventDetailsPopUpSettings)

  constructor() {}
}
