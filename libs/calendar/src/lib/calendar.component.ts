import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { DisplayedEvent, Settings } from '@verseghy/calendar'
import { Event } from './lib/event'
import { Cell } from './lib/cell'
import {
  addMonths,
  differenceInDays,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getISOWeek,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isEqual,
  isSaturday,
  isSunday,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { Renderer } from './lib/renderer'

@Component({
  selector: 'verseghy-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  private _cells: Cell[] = []
  private _date = new Date()
  private _events: Event[] = []
  private _displayedEvents: DisplayedEvent[] = []
  private _settings: Settings
  private _renderer = new Renderer()

  public moreEventsPopupVisible = false
  public moreEventsPopupTop: number
  public moreEventsPopupLeft: number
  public moreEventsPopupDay: string
  public moreEventsPopupDate: number
  public moreEventsPopupEvents
  @ViewChild('moreEvents') moreEventsPopupElement: ElementRef

  public eventDetailsPopupVisible = false
  public eventDetailsPopupTop = 0
  public eventDetailsPopupLeft = 0
  public eventDetailsPopupDate: string
  public eventDetailsPopupTitle: string
  public eventDetailsPopupDescription: string
  public eventDetailsPopupColor: string
  @ViewChild('eventDetails') eventDetailsPopupElement: ElementRef

  @Output() monthChanged = new EventEmitter<{
    year: number
    month: number
  }>()

  constructor(private _el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._renderer.HostElementRef = this._el
      this._renderer.settings = this.settings
      this._changeMonth()
    })
  }

  private _generateEvents(): void {
    this._clearDisplayedEvents()
    for (const item of this._events) {
      this._displayedEvents.push({
        id: item.id,
        title: item.title,
        startDate: item.startDate,
        endDate: item.endDate,
        color: item.color,
      })
    }
    this._sortDisplayedEvents()
    this._renderer.setEvents(this._displayedEvents)
  }

  private _sortDisplayedEvents() {
    let lastDay = this._displayedEvents[0].startDate
    let eventsInDay = []
    const sortedDisplayedEvents = []
    for (const item of this._displayedEvents) {
      if (isAfter(item.startDate, lastDay)) {
        lastDay = item.startDate
        sortedDisplayedEvents.push(...this._sortEventsInDay(eventsInDay))
        eventsInDay = [item]
      } else if (isEqual(item.startDate, lastDay)) {
        eventsInDay.push(item)
      }
    }
    sortedDisplayedEvents.push(...this._sortEventsInDay(eventsInDay))
    this._displayedEvents = sortedDisplayedEvents
  }

  private _changeMonth(): void {
    this._renderer.changeMonth(this._date)
    this._cells = this._renderer.getCells()
    this.monthChanged.emit({
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
    })
    this.closeMoreEventsPopup()
    this.closeEventDetailsPopup()
  }

  get date() {
    return this._date
  }

  get formatedDate() {
    return format(this.date, 'YYYY. ') + this.settings.monthNames[getMonth(this.date)]
  }

  get shortDayNames() {
    return this.settings.shortDayNames
  }

  get today() {
    return this.settings.today
  }

  get cells() {
    return this._cells
  }

  set date(date: Date) {
    this._date = date
    this._changeMonth()
  }

  public nextMonth(): void {
    this.date = addMonths(this.date, 1)
  }

  public prevMonth(): void {
    this.date = subMonths(this.date, 1)
  }

  public now(): void {
    this.date = new Date()
  }

  public setEvents(events: Array<Event>) {
    this._events = events
    this._sortEventsArray()
    this._generateEvents()
  }

  @Input('events') public set events(events: Event[]) {
    if (events.length) {
      this._events = events
      this._sortEventsArray()
      this._generateEvents()
      this._renderer.renderEvents()
    }
  }

  private _sortEventsArray(): void {
    this._events.sort((a, b) => {
      if (isAfter(a.startDate, b.startDate)) {
        return 1
      }
      if (isBefore(a.startDate, b.startDate)) {
        return -1
      }
      return 0
    })
  }
  private _clearDisplayedEvents(): void {
    this._displayedEvents = []
  }

  private _eventLenght(item: DisplayedEvent): number {
    return Math.abs(differenceInDays(item.startDate, item.endDate))
  }

  get settings(): Settings {
    this._settings = this._settings || {}
    this._settings.shortDayNames = this._settings.shortDayNames || ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    this._settings.shortMonthNames = this._settings.shortMonthNames || [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    this._settings.monthNames = this._settings.monthNames || [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    this._settings.today = this._settings.today || 'Today'
    this._settings.moreEvent = this._settings.moreEvent || '{count} more'
    return this._settings
  }

  @Input('settings')
  set settings(settings: Settings) {
    this._settings = settings
  }

  private _sortEventsInDay(events: DisplayedEvent[]): DisplayedEvent[] {
    return events.sort((a, b) => {
      return (this._eventLenght(a) - this._eventLenght(b)) * -1
    })
  }

  @HostListener('window:resize')
  public resize(): void {
    this.closeMoreEventsPopup()
    this.closeEventDetailsPopup()
    this._renderer.resize()
  }

  private _getDisplayedEvents(events) {
    const displayedEvents = []
    for (const item of this._events) {
      for (const event of events) {
        if (item.id === event.id) {
          displayedEvents.push({ id: item.id, title: item.title, color: item.color, order: event.order })
        }
      }
    }
    displayedEvents.sort((a, b) => {
      return a.order - b.order
    })
    return displayedEvents
  }

  private _getEvent(id: number): Event {
    for (const item of this._events) {
      if (item.id === id) {
        return item
      }
    }
    return
  }

  public trackBy1(index, item) {
    return item.id
  }

  public trackBy2(index, item) {
    return item.id
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

  private _getWeekOfMonth(date: Date): number {
    return getISOWeek(date) - getISOWeek(startOfMonth(this.date))
  }

  public setMoreEventsPopup(date: Date, events: number[]): void {
    setTimeout(() => {
      const height = (this._el.nativeElement.offsetHeight - 68) / this._getRowsInMonth()
      const row = this._getWeekOfMonth(date)
      let column = getDay(date)
      if (column === 0) {
        column = 7
      }
      this.moreEventsPopupVisible = true
      this.moreEventsPopupTop = row * height - 50 + 69
      this.moreEventsPopupLeft = (column - 1) * (this._el.nativeElement.offsetWidth / 7) - 24
      this.moreEventsPopupDay = this.settings.shortDayNames[column - 1]
      this.moreEventsPopupDate = getDate(date)
      this.moreEventsPopupEvents = this._getDisplayedEvents(events)
    })
  }

  public closeMoreEventsPopup(): void {
    this.moreEventsPopupVisible = false
  }

  private _formatTwoDays(date1: Date, date2: Date): string {
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

  public setEventDetailsPopup(id: number, click): void {
    setTimeout(() => {
      const event = this._getEvent(id)
      const boundingRect = click.target.getBoundingClientRect()
      const calendarBoundingRect = this._el.nativeElement.getBoundingClientRect()
      this.eventDetailsPopupVisible = true
      this.eventDetailsPopupTitle = event.title
      this.eventDetailsPopupDate = this._formatTwoDays(event.startDate, event.endDate)
      this.eventDetailsPopupDescription = event.description
      this.eventDetailsPopupColor = event.color
      this.eventDetailsPopupTop = boundingRect.y - calendarBoundingRect.y
      if (document.body.clientWidth - boundingRect.right < 320) {
        if (boundingRect.x < 320) {
          this.eventDetailsPopupLeft = calendarBoundingRect.width / 2 - 150
        } else {
          this.eventDetailsPopupLeft = boundingRect.x - 310 - calendarBoundingRect.x
        }
      } else {
        this.eventDetailsPopupLeft = boundingRect.right + 10 - calendarBoundingRect.x
      }
    })
  }

  public closeEventDetailsPopup(): void {
    setTimeout(() => {
      this.eventDetailsPopupVisible = false
    })
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    let eventDetails = false
    let moreEvents = false
    for (let i = 0; i < event.path.length; i++) {
      const element = event.path[i]
      if (this.eventDetailsPopupVisible && element === this.eventDetailsPopupElement.nativeElement) {
        if (this.moreEventsPopupVisible) {
          moreEvents = true
        }
        eventDetails = true
      }
      if (this.moreEventsPopupVisible && element === this.moreEventsPopupElement.nativeElement) {
        moreEvents = true
      }

      if (element.parentElement) {
        if (
          element.parentElement.classList.contains('event') &&
          !element.parentElement.classList.contains('more') &&
          !element.parentElement.classList.contains('popup-event')
        ) {
          eventDetails = true
          moreEvents = false
        }
        if (element.parentElement.classList.contains('event') && element.parentElement.classList.contains('more')) {
          eventDetails = false
          moreEvents = true
        }
        if (
          element.parentElement.classList.contains('event') &&
          !element.parentElement.classList.contains('more') &&
          element.parentElement.classList.contains('popup-event')
        ) {
          eventDetails = true
          moreEvents = true
        }
      }
    }
    if (!eventDetails) {
      this.eventDetailsPopupVisible = false
    }
    if (!moreEvents) {
      this.moreEventsPopupVisible = false
    }
  }
}
