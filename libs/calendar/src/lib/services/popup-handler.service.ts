import { Injectable } from '@angular/core';
import { CalendarEvent, PopupSettings, Settings } from '../calendar.interfaces';
import { getYear, format, getMonth, getDate, getISOWeek, startOfMonth, getDay, isSunday, isSaturday, getDaysInMonth, isSameDay } from 'date-fns';
import { hu } from 'date-fns/locale'
import { Store } from '@ngrx/store';
import { fromPopupActions } from '../+state/popup.actions';

@Injectable({
  providedIn: 'root'
})
export class PopupHandlerService {

  public settings: Settings
  public hostElement: HTMLElement
  public date: Date

  constructor(private store: Store<any>) { }

  public setEventDetailsPopup(event: CalendarEvent, clickedElement: HTMLElement) {
    const boundingRect = clickedElement.getBoundingClientRect() as DOMRect
    const calendarBoundingRect = this.hostElement.getBoundingClientRect() as DOMRect

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
      date: this._formatTwoDays(event.startDate, event.endDate),
      description: event.description,
      color: event.color,
    }

    this.store.dispatch(new fromPopupActions.SetEventDetailsPopup(popupSettings))
  }

  public setMoreEventsPopup(date: Date, events: CalendarEvent[]) {
    const height = (this.hostElement.offsetHeight - 68) / this._getRowsInMonth()
    const row = this._getWeekOfMonth(date)
    let column = getDay(date)
    if (column === 0) {
      column = 7
    }

    const top = row * height - 50 + 69
    const left = (column - 1) * (this.hostElement.offsetWidth / 7) - 24

    let eventsArray = []

    for (const item of events) {
      eventsArray = [...eventsArray,{
        id: item.id,
        title: item.title,
        color: item.color
      }]
    }

    const popupSettings: PopupSettings = {
      visible: true,
      top,
      left,
      date: String(getDate(date)),
      day: this.settings.shortDayNames[column - 1],
      events: eventsArray
    }

    this.store.dispatch(new fromPopupActions.SetMoreEventsPopup(popupSettings))
  }

  private _formatTwoDays(date1: Date, date2: Date): string {
    if (!isSameDay(date1, date2)) {
      let year = ''
      let month = ''
      if (getYear(date1) !== getYear(date2)) {
        year = format(date2, ' yyyy.')
      }
      if (getMonth(date1) !== getMonth(date2) || year !== '') {
        month = format(date2, ' MMMM', { locale: hu })
      }
      return (
        format(date1, 'yyyy. MMMM dd -', { locale: hu }) + year + month + format(date2, ' dd')
      )
    } else {
      return format(date1, 'yyyy. MMMM dd', { locale: hu })
    }
  }

  private _getWeekOfMonth(date: Date): number {
    return getISOWeek(date) - getISOWeek(startOfMonth(this.date))
  }

  private _getRowsInMonth(): number {
    if (
      (isSunday(startOfMonth(this.date)) && getDaysInMonth(this.date) >= 30) ||
      (isSaturday(startOfMonth(this.date)) && getDaysInMonth(this.date) === 31)
    ) {
      return 6
    }
    return 5
  }
}
