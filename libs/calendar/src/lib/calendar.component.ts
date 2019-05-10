import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Settings, CalendarEvent } from '@verseghy/calendar'
import { Cell } from './lib/cell'
import { format, startOfWeek, addDays } from 'date-fns'
import { hu } from 'date-fns/locale'
import { PopupHandlerService } from './services/popup-handler.service'
import { map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { POPUP_FEATURE_KEY, PopupState } from './+state/popup.reducer'
import { fromPopupActions } from './+state/popup.actions'
import { cellsQuery } from './+state/cells.selectors'
import { fromCellsActions } from './+state/cells.actions'
import { MatDialog } from '@angular/material/dialog'
import { MoreDetailsDialogComponent } from './more-details-dialog/more-details-dialog.component'

@Component({
  selector: 'verseghy-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  private _settings: Settings
  private _isDialogOpen = false
  private _eventsIds = []

  public today = this.settings.today
  public cells = this.store.pipe(select(cellsQuery.selectCells))
  public formatedDate = this.store.pipe(
    select(cellsQuery.selectMonth),
    map((date: Date) => {
      this.closeMoreEventsPopup()
      this.monthChanged.emit({
        year: date.getFullYear(),
        month: date.getMonth(),
      })
      return format(date, 'yyyy. LLLL', { locale: hu })
    })
  )
  public moreEventsPopup = this.store.pipe(
    select(POPUP_FEATURE_KEY),
    map((state: PopupState) => {
      return state.moreEventsPopup
    })
  )
  public moreEventsPopupEvents = this.store.pipe(
    select(cellsQuery.selectedMoreEvents),
    map(events => events)
  )

  @ViewChild('moreEvents') moreEventsPopupElement: ElementRef

  @Output() monthChanged = new EventEmitter<{
    year: number
    month: number
  }>()

  constructor(private _el: ElementRef, private popupHandler: PopupHandlerService, private store: Store<any>, private dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.popupHandler.hostElement = this._el.nativeElement
      this.store.dispatch(new fromCellsActions.SetHostHeight(this._el.nativeElement.offsetHeight))
    })
  }

  get shortDayNames() {
    const firstDate = startOfWeek(new Date(), { weekStartsOn: 1 })
    let dayNames = []
    for (let i = 0; i < 7; i++) {
      const dayName = format(addDays(firstDate, i), 'EEEEEE', { locale: hu })
      dayNames = [...dayNames, dayName]
    }
    return dayNames
  }

  public nextMonth(): void {
    this.store.dispatch(new fromCellsActions.NextMonth())
  }

  public prevMonth(): void {
    this.store.dispatch(new fromCellsActions.PreviousMonth())
  }

  public now(): void {
    this.store.dispatch(new fromCellsActions.Today())
  }

  get settings(): Settings {
    this._settings = this._settings || {}
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

  @Input('events') public set events(events: CalendarEvent[]) {
    if (!events) return
    if (events.length) {
      const tempEvents = events.filter(item => {
        if (this._eventsIds.includes(item.id)) return false
        this._eventsIds = [...this._eventsIds, item.id]
        return true
      })
      this.store.dispatch(new fromCellsActions.SetEvents(tempEvents))
    }
  }

  public trackByFn(index, item) {
    return item.trackBy
  }

  public cellsTrackByFn(index, item) {
    return item.date
  }

  public setMoreEventsPopup(date: Date): void {
    this.store.dispatch(new fromCellsActions.SetSelectedMoreEvent(date))
    setTimeout(() => {
      this.popupHandler.setMoreEventsPopup(date)
    })
  }

  public closeMoreEventsPopup(): void {
    this.store.dispatch(new fromPopupActions.HideMoreEventsPopup())
  }

  public setEventDetailsPopup(id: number, click: Event): void {
    this.store.dispatch(new fromCellsActions.SetSelectedEvent(id))
    const dialog = this.dialog.open(MoreDetailsDialogComponent, {
      width: '350px',
    })

    dialog.afterOpened().subscribe(result => {
      this._isDialogOpen = true
    })

    dialog.afterClosed().subscribe(result => {
      this._isDialogOpen = false
    })
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.moreEventsPopupElement && !this.moreEventsPopupElement.nativeElement.contains(event.target) && !this._isDialogOpen) {
      this.closeMoreEventsPopup()
    }
  }

  @HostListener('window:resize')
  resize(): void {
    this.store.dispatch(new fromCellsActions.SetHostHeight(this._el.nativeElement.offsetHeight))
    this.closeMoreEventsPopup()
  }
}
