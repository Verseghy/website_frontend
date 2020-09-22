import { format, getDate, getMonth } from 'date-fns'
import { Settings } from '../calendar.interfaces'

export class Cell {
  private _id: number
  private _rows: {
    id: number
    row: number
    free: boolean
    title: string
    width: number
    color: string
    placeholder: boolean
  }[] = []
  private _date: Date
  private _today: boolean
  private _maxRows: number
  private _moreEventsTop: string
  private _moreEventsCount = 0
  private _settings: Settings
  private _moreEventsVisible: boolean

  constructor(id: number, today: boolean, date: Date, maxRows: number, settings: Settings) {
    this._id = id
    this._today = today
    this._date = date
    this._maxRows = maxRows
    this._settings = settings
  }

  public getRow(width: number): number {
    for (const item of Object.keys(this._rows)) {
      if (this._rows[item].width <= width) {
        return Number(item) + 1
      }
    }
    return this._rows.length + 1
  }

  get firstFreeRow(): number {
    for (const item of this._rows) {
      if (item.free) {
        return item.row
      }
    }
    return this._rows.length
  }

  get day(): string {
    if (getDate(this._date) === 1) {
      return this._settings.shortMonthNames[getMonth(this._date)] + format(this._date, '. D')
    }
    return format(this._date, 'D')
  }

  get today(): boolean {
    return this._today
  }

  get date(): Date {
    return this._date
  }

  get getEvents(): number[] {
    const events = []
    for (const item of this._rows) {
      if (!item.free) {
        events.push({ id: item.id, order: item.row })
      }
    }
    return events
  }

  get moreEventsVisible(): boolean {
    return this._moreEventsVisible
  }

  get moreEventsTop(): string {
    return this._moreEventsTop
  }

  get moreEventsText(): string {
    const text = this._settings.moreEvent
    return text.replace('{count}', String(this._moreEventsCount))
  }

  get renderedEvents() {
    const events = []
    let moreEvents = 0
    for (const item of Object.keys(this._rows)) {
      let rows = 0
      if (this._rows[item].length <= this._maxRows) {
        rows = this._maxRows
      } else {
        rows = this._maxRows - 1
      }
      rows = this._maxRows - 1
      if (this._rows[item].row < rows) {
        if (this._rows[item].row < this._maxRows - 1) {
          if (!this._rows[item].placeholder) {
            const top = Number(item) * 24 + 'px'
            const width = 'calc(' + this._rows[item].width * 100 + '% + ' + (this._rows[item].width * 2 - 6) + 'px)'
            events.push({
              id: this._rows[item].id,
              title: this._rows[item].title,
              top: top,
              width: width,
              color: this._rows[item].color,
              more: false,
            })
          }
        }
      } else {
        if (!this._rows[item].free) {
          moreEvents++
        }
      }
    }
    if (moreEvents) {
      this._moreEventsVisible = true
      this._moreEventsTop = (this._maxRows - 1) * 24 + 'px'
      this._moreEventsCount = moreEvents
    }
    return events
  }

  set maxRows(rows: number) {
    this._maxRows = rows
  }

  public push(id: number, row: number, title: string, width: number, color: string, placeholder: boolean) {
    if (this._rows[row]) {
      this._rows[row].id = id
      this._rows[row].row = row
      this._rows[row].free = false
      this._rows[row].title = title
      this._rows[row].width = width
      this._rows[row].color = color
      this._rows[row].placeholder = placeholder
    } else {
      for (const _ of Array(row - this._rows.length + 1)) {
        this._rows.push({
          id: 0,
          row: this._rows.length,
          free: true,
          title: '',
          width: 0,
          color: '',
          placeholder: true,
        })
      }
      this._rows[row].id = id
      this._rows[row].row = row
      this._rows[row].free = false
      this._rows[row].title = title
      this._rows[row].width = width
      this._rows[row].color = color
      this._rows[row].placeholder = placeholder
    }
  }

  public getLastRow(): number {
    return this._rows.length
  }
}
