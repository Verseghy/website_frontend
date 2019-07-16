import { Injectable } from '@angular/core'
import { PopupSettings, Settings } from '../calendar.interfaces'
import { getDate, startOfMonth, getDay, isSunday, isSaturday, getDaysInMonth, format, getWeek } from 'date-fns'
import { Store } from '@ngrx/store'
import { fromPopupActions } from '../+state/popup.actions'
import { hu } from 'date-fns/locale'

@Injectable({
  providedIn: 'root',
})
export class PopupHandlerService {
  public settings: Settings
  public hostElement: HTMLElement

  constructor(private store: Store<any>) {}

  public setMoreEventsPopup(date: Date) {
    const height = (this.hostElement.offsetHeight - 68) / this._getRowsInMonth(date)
    const row = this._getWeekOfMonth(date)
    console.log(date)
    let column = getDay(date)
    if (column === 0) {
      column = 7
    }

    const top = row * height - 50 + 69
    const left = (column - 1) * (this.hostElement.offsetWidth / 7) - 24

    const popupSettings: PopupSettings = {
      visible: true,
      top,
      left,
      date: String(getDate(date)),
      day: format(date, 'EEEEEE', { locale: hu }),
    }

    this.store.dispatch(new fromPopupActions.SetMoreEventsPopup(popupSettings))
  }

  private _getWeekOfMonth(date: Date): number {
    return getWeek(date) - getWeek(startOfMonth(date))
  }

  private _getRowsInMonth(date): number {
    if (
      (isSunday(startOfMonth(date)) && getDaysInMonth(date) >= 30) ||
      (isSaturday(startOfMonth(date)) && getDaysInMonth(date) === 31)
    ) {
      return 6
    }
    return 5
  }
}
