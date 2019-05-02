import { Injectable } from '@angular/core';
import { CalendarEvent, PopupSettings, Settings } from '../calendar.interfaces';
import { isEqual, getYear, format, getMonth } from 'date-fns';
import { Store } from '@ngrx/store';
import { fromPopupActions } from '../+state/popup.actions';

@Injectable({
  providedIn: 'root'
})
export class PopupHandlerService {

  public settings: Settings

  constructor(private store: Store<any>) { }

  setEventDetailsPopup(event: CalendarEvent, clickedElement: HTMLElement, hostElement: HTMLElement) {
    const boundingRect = clickedElement.getBoundingClientRect() as DOMRect
    const calendarBoundingRect = hostElement.getBoundingClientRect() as DOMRect

    let top = 0
    let left = 0

    top = boundingRect.y - calendarBoundingRect.y
    if (document.body.clientWidth - boundingRect.right < 320) {
      if (boundingRect.x < 320) {
        left = calendarBoundingRect.width / 2 - 150
      } else {
        left = boundingRect.x - 310 - calendarBoundingRect.x
      }
    } else {
      left = boundingRect.right + 10 - calendarBoundingRect.x
    }

    const popupSettings: PopupSettings = {
      visible: true,
      title: event.title,
      top,
      left,
      date: this.formatTwoDays(event.startDate, event.endDate),
      description: event.description,
      color: event.color,
    }

    this.store.dispatch(new fromPopupActions.SetEventDetailsPopup(popupSettings))
  }

  public formatTwoDays(date1: Date, date2: Date): string {
    if (!isEqual(date1, date2)) {
      let year = ''
      let month = ''
      if (getYear(date1) !== getYear(date2)) {
        year = format(date2, ' YYYY.')
      }
      if (getMonth(date1) !== getMonth(date2) || year !== '') {
        month = ' ' + this.settings.monthNames[getMonth(date2)]
      }
      return (
        format(date1, 'YYYY. ') + this.settings.monthNames[getMonth(date1)] + format(date1, ' D -') + year + month + format(date2, ' D')
      )
    } else {
      return format(date1, 'YYYY. ') + this.settings.monthNames[getMonth(date1)] + format(date1, ' D')
    }
  }
}
