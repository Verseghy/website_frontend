 import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core'
import { DisplayedEvent, Settings, CalendarEvent } from '@verseghy/calendar'
import { Cell } from './lib/cell'
import { addMonths, differenceInDays, format, subMonths, startOfWeek, addDays } from 'date-fns'
import { hu } from 'date-fns/locale'
import { PopupHandlerService } from './services/popup-handler.service';
import { map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store';
import { POPUP_FEATURE_KEY, PopupState } from './+state/popup.reducer';
import { fromPopupActions } from './+state/popup.actions';
import { cellsQuery } from './+state/cells.selectors';
import { fromCellsActions } from './+state/cells.actions';

@Component({
  selector: 'verseghy-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  private _date = new Date()
  private _events: CalendarEvent[] = []
  private _settings: Settings

  public cells = this.store.pipe(
    select(cellsQuery.selectCells)
  )

  @ViewChild('moreEvents') moreEventsPopupElement: ElementRef
  @ViewChild('eventDetails') eventDetailsPopupElement: ElementRef

  @Output() monthChanged = new EventEmitter<{
    year: number
    month: number
  }>()

  public eventDetailsPopup = this.store.pipe(
    select(POPUP_FEATURE_KEY),
    map((state: PopupState) => {
      return state.eventDetailsPopup
    })
  )

  public moreEventsPopup = this.store.pipe(
    select(POPUP_FEATURE_KEY),
    map((state: PopupState) => {
      return state.moreEventsPopup
    })
  )

  constructor(private _el: ElementRef, private popupHandler: PopupHandlerService, private store: Store<any>) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._changeMonth()
      this.popupHandler.hostElement = this._el.nativeElement
      this.store.dispatch(new fromCellsActions.SetHostHeight(this._el.nativeElement.offsetHeight))
    })
  }

  private _changeMonth(): void {
    this.store.dispatch(new fromCellsActions.SetMonth(this._date))
    this.monthChanged.emit({
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
    })
    this.popupHandler.date = this._date
    this.closeMoreEventsPopup()
    this.closeEventDetailsPopup()
  }

  get date() {
    return this._date
  }

  get formatedDate() {
    return format(this.date, 'yyyy. LLLL', {locale: hu})
  }

  get shortDayNames() {
    const firstDate = startOfWeek(new Date, {weekStartsOn: 1})
    let dayNames = []
    for (let i = 0; i < 7; i++) {
      const dayName = format(addDays(firstDate, i), 'EEEEEE', {locale: hu})
      dayNames = [...dayNames, dayName]
    }
    return dayNames
  }

  get today() {
    return this.settings.today
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

  private _isArrayContainsId(array: CalendarEvent[], id: Number): boolean {
    for (const item of array) {
      if (item.id === id) {
        return true
      }
    }
    return false
  }

  @Input('events') public set events(events: CalendarEvent[]) {
    if (!events) return
    if (events.length) {
      let tempEvents = []
      for (const event of events) {
        if (!!tempEvents.length) {
          if (!this._isArrayContainsId(tempEvents, event.id)) {
            tempEvents = [...tempEvents, event]
          }
        } else {
          tempEvents = [...tempEvents, event]
        }
      }
      this.store.dispatch(new fromCellsActions.SetEvents(tempEvents))
      this._events = tempEvents
    }
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
    this.popupHandler.settings = settings
    Cell.settings = settings
  }

  @HostListener('window:resize')
  public resize(): void {
    this.closeMoreEventsPopup()
    this.closeEventDetailsPopup()
  }

  private _getEvent(id: number): CalendarEvent {
    for (const item of this._events) {
      if (item.id === id) {
        return item
      }
    }
    return
  }

  public trackByFn(index, item) {
    return item.trackBy
  }

  public cellsTrackByFn(index, item) {
    return item.date
  }

  public setMoreEventsPopup(date: Date, events: {id: number, order:number}[]): void {
    setTimeout(() => {
      let eventsArray = []
      for (const item of events) {
        eventsArray = [...eventsArray, this._getEvent(item.id)]
      }
      this.popupHandler.setMoreEventsPopup(date, eventsArray)
    })
  }

  public closeMoreEventsPopup(): void {
    this.store.dispatch(new fromPopupActions.HideMoreEventsPopup())
  }

  public setEventDetailsPopup(id: number, click: Event): void {
    setTimeout(() => {
      this.popupHandler.setEventDetailsPopup(this._getEvent(id), click.target as HTMLElement)
    });    
  }

  public closeEventDetailsPopup(): void {
    this.store.dispatch(new fromPopupActions.HideEventDetailsPopup())
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    let outsideEvetDetailsPopup = false
    if (
      this.eventDetailsPopupElement
      && !this.eventDetailsPopupElement.nativeElement.contains(event.target)
    ) {
      outsideEvetDetailsPopup = true
      this.closeEventDetailsPopup()
    }
    if (
      this.moreEventsPopupElement
      && !this.moreEventsPopupElement.nativeElement.contains(event.target)
    ) {
      if (outsideEvetDetailsPopup) {
        this.closeMoreEventsPopup()
      }
      if (!this.eventDetailsPopupElement) {
        this.closeMoreEventsPopup()
      }
    }
  }
}
