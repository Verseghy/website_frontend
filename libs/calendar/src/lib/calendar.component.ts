import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit } from "@angular/core";
import { DisplayedEvent, Settings } from "./calendar.interfaces";
import { Event } from "./lib/event";
import { Cell } from "./lib/cell";
import { addMonths, differenceInDays, format, isAfter, isBefore, isEqual, subMonths } from "date-fns";
import { Renderer } from "./lib/renderer";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'verseghy-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  public shortDayNames: string[];
  public monthChange$ = new BehaviorSubject<any>({
    year: this.date.getFullYear(),
    month: this.date.getMonth()
  });
  private _events: Event[] = [];
  private _displayedEvents: DisplayedEvent[] = [];
  private _renderer = new Renderer();

  constructor(private el: ElementRef) { }

  private _cells: Cell[] = [];

  get cells() {
    return this._cells;
  }

  private _date = new Date();

  get date() {
    return this._date;
  }

  set date(date: Date) {
    this._date = date;
    this._changeMonth();
  }

  private _settings: Settings;

  get settings(): Settings {
    this._settings = this._settings || {};
    this._settings.shortDayNames = this._settings.shortDayNames || ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    return this._settings;
  }

  @Input('settings')
  set settings(settings: Settings) {
    this._settings = settings;
  }

  get formatedDate() {
    return format(this.date, 'YYYY. MMMM');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._renderer.HostElementRef = this.el;
      this.shortDayNames = this.settings.shortDayNames;
      this._changeMonth();
    });
  }

  public nextMonth(): void {
    this.date = addMonths(this.date, 1);
  }

  public prevMonth(): void {
    this.date = subMonths(this.date, 1);
  }

  public now(): void {
    this.date = new Date();
  }

  public setEvents(events: Array<Event>) {
    this._events = events;
    this._sortEventsArray();
    this._generateEvents();
  }

  public addEvent(event: Event) {
    this._events.push(event);
    this._sortEventsArray();
    this._generateEvents();
  }

  @HostListener('window:resize')
  public resize(): void {
    this._renderer.resize();
  }

  public getEvent(id: number | number[]): Event | Event[] {
    if (typeof id === 'number') {
      for (const item of this._events) {
        if (item.id === id) {
          return item;
        }
      }
    } else {
      const events = [];
      for (const item of this._events) {
        for (const i of id) {
          if (item.id === i) {
            events.push(item);
          }
        }
      }
      return events;
    }
    return;
  }

  public trackBy1(index, item) {
    return item.id;
  }

  public trackBy2(index, item) {
    return item.id;
  }

  private _generateEvents(): void {
    this._clearDisplayedEvents();
    for (const item of this._events) {
      this._displayedEvents.push({
        id: item.id,
        title: item.title,
        startDate: item.startDate,
        endDate: item.endDate,
        color: item.color
      });
    }
    this._sortDisplayedEvents();
    this._renderer.setEvents(this._displayedEvents);
  }

  private _sortDisplayedEvents() {
    let lastDay = this._displayedEvents[0].startDate;
    let eventsInDay = [];
    const sortedDisplayedEvents = [];
    for (const item of this._displayedEvents) {
      if (isAfter(item.startDate, lastDay)) {
        lastDay = item.startDate;
        sortedDisplayedEvents.push(...this._sortEventsInDay(eventsInDay));
        eventsInDay = [item];
      } else if (isEqual(item.startDate, lastDay)) {
        eventsInDay.push(item);
      }
    }
    sortedDisplayedEvents.push(...this._sortEventsInDay(eventsInDay));
    this._displayedEvents = sortedDisplayedEvents;
  }

  private _changeMonth(): void {
    this._renderer.changeMonth(this._date);
    this._cells = this._renderer.getCells();
    this.monthChange$.next({
      year: this.date.getFullYear(),
      month: this.date.getMonth()
    });
  }

  private _sortEventsArray(): void {
    this._events.sort((a, b) => {
      if (isAfter(a.startDate, b.startDate)) { return 1; }
      if (isBefore(a.startDate, b.startDate)) { return -1; }
      return 0;
    });
  }

  private _clearDisplayedEvents(): void {
    this._displayedEvents = [];
  }

  private _eventLenght(item: DisplayedEvent): number {
    return Math.abs(differenceInDays(item.startDate, item.endDate));
  }

  private _sortEventsInDay(events: DisplayedEvent[]): DisplayedEvent[] {
    return events.sort((a, b) => {
      return (this._eventLenght(a) - this._eventLenght(b)) * (-1);
    });
  }
}
