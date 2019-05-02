import { NgxCalendarLibService } from '../calendar.service';
import { BehaviorSubject } from 'rxjs';
import { EventDetailsPopUpSettings } from '../calendar.interfaces';

export class popUpHandler {
  eventDetailsPopUp$: BehaviorSubject<EventDetailsPopUpSettings>

  constructor(private calendarService: NgxCalendarLibService) {
    this.eventDetailsPopUp$ = calendarService.eventDetailsPopUp$
  }

  public closeEventDetailsPopup() {
    this.eventDetailsPopUp$.next()
  }
}