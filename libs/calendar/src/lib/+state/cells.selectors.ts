import { CellsState } from './cells.reducer';
import { createSelector } from '@ngrx/store';
import { CalendarEvent, DisplayedEvent } from '../calendar.interfaces';
import { Cell } from '../lib/cell';
import { getMonth, getYear, isSunday, startOfMonth, isSaturday, getDaysInMonth, lastDayOfMonth, subMonths, startOfWeek, addDays, isToday, isEqual, isBefore, differenceInDays, isFirstDayOfMonth } from 'date-fns';

const selectEvents = (state: CellsState) => {
  return state.events
}

export const selectMonth = (state: CellsState) => {
  return state.month
}

const selectHeight = (state: CellsState) => {
  return state.height
}

const selectRowsInMonth = createSelector(
  selectMonth,
  (month: Date): number => {
    if (
      (isSunday(startOfMonth(month)) && getDaysInMonth(month) >= 30) ||
      (isSaturday(startOfMonth(month)) && getDaysInMonth(month) === 31)
    ) {
      return 6
    }
    return 5
  }
)

const selectFirstCellDate = createSelector(
  selectMonth,
  (month: Date): Date => {
    return startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  }
)

const selectCalendarEventsInMonth = createSelector(
  selectEvents,
  selectMonth,
  (events: CalendarEvent[], month: Date): CalendarEvent[] => {
    let eventsInMonth: CalendarEvent[] = []
    for (const event of events) {
      if (
        (getYear(event.startDate) === getYear(month)
        && getMonth(event.startDate) === getMonth(month))
        || (getYear(event.endDate) === getYear(month)
        && getMonth(event.endDate) === getMonth(month))
      ) {
        eventsInMonth = [...eventsInMonth, event]
      }
    }
    return eventsInMonth
  }
)

const selectGeneratedCells = createSelector(
  selectRowsInMonth,
  selectFirstCellDate,
  selectHeight,
  selectMonth,
  (rows: number, firstCellDate: Date, hostHeight: number, month: Date): Cell[] => {
    let cellsInMonth: Cell[] = []
    for (let i = 0; i < 7 * rows; i++) {
      let id = 0
      const date = addDays(firstCellDate, id)
      const today = isToday(date)
      const cellHeight = (hostHeight - 68) / rows - 32
      const maxRows = Math.floor(cellHeight / 24)
      const cell = new Cell(
        id++,
        today,
        date,
        maxRows
      )
      cellsInMonth = [...cellsInMonth, cell]
    }
    return cellsInMonth
  }
)

const selectDisplayEvents = createSelector(
  selectCalendarEventsInMonth,
  (events: CalendarEvent[]): DisplayedEvent[] => {
    let displayedEvents: DisplayedEvent[] = []
    for (const event of events) {
      let displayedEvent = {
        id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        color: event.color,
      }
      if (isEqual(event.startDate, event.endDate)) {
        displayedEvents = [...displayedEvents, displayedEvent]
      }
      if (isBefore(event.startDate, event.endDate)) {
        const eventLength = Math.abs(differenceInDays(event.startDate, event.endDate)) + 1
        let startDate = event.startDate
        for (let i = 0; i < eventLength; i++) {
          if (
            isSunday(addDays(event.startDate, i))
            && isEqual(addDays(event.startDate, i), event.endDate)
          ) {
            displayedEvent = {...displayedEvent,
              startDate: startDate,
              endDate: addDays(event.startDate, i)
            }
            displayedEvents = [...displayedEvents, displayedEvent]
            startDate = addDays(event.startDate, i)
          }
        }
      }
    }
    return displayedEvents
  }
)

export const selectCells = createSelector(
  selectGeneratedCells,
  selectDisplayEvents,
  selectFirstCellDate,
  (cells: Cell[], events: DisplayedEvent[], firstCellDate: Date): Cell[] => {
    for (const event of events) {
      const row = cells[Math.abs(differenceInDays(event.startDate, firstCellDate))].firstFreeRow
      const eventLength = Math.abs(differenceInDays(event.startDate, event.endDate)) + 1
      for (let i = 0; i < eventLength; i++) {
        const cell = cells[Math.abs(differenceInDays(addDays(event.startDate, i), firstCellDate))]
        const placeholder = i !== 0
        cell.push(event.id, row, event.title, eventLength, event.color, placeholder)
      }
    }
    return cells
  }
)

export const cellsQuery = {
  selectMonth,
  selectCells
}
