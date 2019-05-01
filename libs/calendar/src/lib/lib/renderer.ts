import { DisplayedEvent, Settings } from '../calendar.interfaces'
import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  getDaysInMonth,
  isAfter,
  isBefore,
  isEqual,
  isSaturday,
  isSunday,
  isToday,
  lastDayOfMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns'
import { Cell } from './cell'
import { ElementRef } from '@angular/core'

export class Renderer {
  private _date = new Date()
  private _cells: Cell[] = []
  private _events: DisplayedEvent[] = []
  private _settings: Settings
  public HostElementRef: ElementRef

  public renderEvents(): Cell[] {
    this._generateCells()
    const firstCellDate = this._getFirstCellDate()
    for (const i of Object.keys(this._events)) {
      const item = this._events[i]
      const eventsInDay = []
      if (isBefore(item.startDate, item.endDate)) {
        let eventStartDate = item.startDate
        for (let i2 = 0; i2 < this._eventLenght(item); i2++) {
          if (
            isSunday(addDays(item.startDate, i2)) &&
            format(addDays(item.startDate, i2), 'YYYY-MM-DD') !== format(item.endDate, 'YYYY-MM-DD')
          ) {
            eventsInDay.push({
              id: item.id,
              title: item.title,
              startDate: eventStartDate,
              endDate: addDays(item.startDate, i2),
              color: item.color,
            })
            eventStartDate = addDays(item.startDate, i2 + 1)
          }
        }
        eventsInDay.push({
          id: item.id,
          title: item.title,
          startDate: eventStartDate,
          endDate: item.endDate,
          color: item.color,
        })
      } else if (isEqual(item.startDate, item.endDate)) {
        eventsInDay.push({
          id: item.id,
          title: item.title,
          startDate: item.startDate,
          endDate: item.endDate,
          color: item.color,
        })
      }
      for (const item2 of eventsInDay) {
        if (this._isEventInMonth(item2)) {
          const row = this._cells[Math.abs(differenceInDays(item2.startDate, firstCellDate))].firstFreeRow
          this._fillCellPlaceholder(item2, row)
        }
      }
    }
    return this._cells
  }

  public changeMonth(date: Date): void {
    this._date = date
    this._generateCells()
  }

  public setEvents(events: DisplayedEvent[]): void {
    this._events = events
  }

  private _generateCells(): void {
    this._clearCells()
    const rows = this._getRowsInMonth()
    const firstCellDate = this._getFirstCellDate()
    for (let i = 0; i < 7 * rows; i++) {
      const cell = new Cell(i, isToday(addDays(firstCellDate, i)), addDays(firstCellDate, i), this._getMaxVisibleRows(), this._settings)
      this._cells.push(cell)
    }
  }

  private _getFirstCellDate(): Date {
    if (isSunday(lastDayOfMonth(subMonths(this._date, 1)))) {
      return startOfMonth(this._date)
    }

    return addDays(startOfWeek(lastDayOfMonth(subMonths(this._date, 1))), 1)
  }

  private _getLastCellDate(): Date {
    if (isSunday(endOfMonth(this._date))) {
      return endOfMonth(this._date)
    }

    return addDays(endOfWeek(endOfMonth(this._date)), 1)
  }

  private _isEventInMonth(item: DisplayedEvent): boolean {
    const firstCellDate = this._getFirstCellDate()
    const lastCellDate = this._getLastCellDate()
    return (
      isAfter(format(item.startDate, 'YYYY-MM-DD'), format(subDays(firstCellDate, 1), 'YYYY-MM-DD')) &&
      isBefore(format(item.endDate, 'YYYY-MM-DD'), format(addDays(lastCellDate, 1), 'YYYY-MM-DD'))
    )
  }

  private _fillCellPlaceholder(item: DisplayedEvent, row: number): void {
    const firstCellDate = this._getFirstCellDate()
    for (let i = 0; i < this._eventLenght(item); i++) {
      const cell = this._cells[Math.abs(differenceInDays(addDays(item.startDate, i), firstCellDate))]
      let placeholder = true
      if (i === 0) {
        placeholder = false
      }
      cell.push(item.id, row, item.title, this._eventLenght(item), item.color, placeholder)
    }
  }

  private _eventLenght(item: DisplayedEvent): number {
    return Math.abs(differenceInDays(item.startDate, item.endDate)) + 1
  }

  private _clearCells(): void {
    this._cells = []
  }

  private _getRowsInMonth(): number {
    if (
      (isSunday(startOfMonth(this._date)) && getDaysInMonth(this._date) >= 30) ||
      (isSaturday(startOfMonth(this._date)) && getDaysInMonth(this._date) === 31)
    ) {
      return 6
    }
    return 5
  }

  private _getMaxVisibleRows(): number {
    const height = (this.HostElementRef.nativeElement.offsetHeight - 68) / this._getRowsInMonth() - 32
    const maxRows = Math.floor(height / 24)
    return maxRows
  }

  public resize(): void {
    for (const item of this._cells) {
      item.maxRows = this._getMaxVisibleRows()
    }
  }

  set settings(settings: Settings) {
    this._settings = settings
  }
}
