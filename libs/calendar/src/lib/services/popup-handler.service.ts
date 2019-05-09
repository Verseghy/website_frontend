import { Injectable } from '@angular/core';
import { CalendarEvent, PopupSettings, Settings } from '../calendar.interfaces';
import { getDate, getISOWeek, startOfMonth, getDay, isSunday, isSaturday, getDaysInMonth } from 'date-fns';
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
