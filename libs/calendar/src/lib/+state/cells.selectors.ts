import { CellsState, CELLS_FEATURE_KEY } from './cells.reducer';
import { createSelector } from '@ngrx/store';
import { CalendarEvent, DisplayedEvent } from '../calendar.interfaces';
import { Cell } from '../lib/cell';
import { getMonth, getYear, isSunday, startOfMonth, isSaturday, getDaysInMonth, startOfWeek, addDays, differenceInDays, lastDayOfWeek, isSameDay, isSameMonth, isSameYear, getOverlappingDaysInIntervals, parseISO, areIntervalsOverlapping, format } from 'date-fns';
import { endOfWeek, endOfMonth, eachDayOfInterval } from 'date-fns/esm';


export const selectFeature = (state: any) => {
  return state[CELLS_FEATURE_KEY]
}

const selectEvents = createSelector(
  selectFeature,
  (state: CellsState) => state.events
)

export const selectMonth = createSelector(
  selectFeature,
  (state: CellsState) => state.month
)

const selectHeight = createSelector(
  selectFeature,
  (state: CellsState) => state.height
)

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

const selectLastCellDate = createSelector(
  selectMonth,
  (month: Date): Date => {
    return endOfWeek(endOfMonth(month), { weekStartsOn: 1 })
  }
)

const selectCalendarEventsInMonth = createSelector(
  selectEvents,
  selectMonth,
  selectFirstCellDate,
  selectLastCellDate,
  (events: CalendarEvent[], month: Date, firstCellDate: Date, lastCellDate: Date): CalendarEvent[] => {
    let eventsInMonth: CalendarEvent[] = []
    for (const event of events) {
      const overlap = areIntervalsOverlapping(
        { start: firstCellDate, end: lastCellDate },
        { start: event.startDate, end: event.endDate }
      )
      if (overlap) eventsInMonth = [...eventsInMonth, event]
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
      const date = addDays(firstCellDate, i)
      const today = isSameDay(date, new Date())
      const cellHeight = (hostHeight - 68) / rows - 32
      const maxRows = Math.floor(cellHeight / 24)
      const anotherMonth = !isSameMonth(date, month)
      const cell = new Cell(
        i,
        today,
        date,
        maxRows,
        anotherMonth
      )
      cellsInMonth = [...cellsInMonth, cell]
    }
    return cellsInMonth
  }
)

const selectDisplayEvents = createSelector(
  selectCalendarEventsInMonth,
  selectFirstCellDate,
  selectLastCellDate,
  (events: CalendarEvent[], firstCellDate: Date, lastCellDate: Date): DisplayedEvent[] => {
    let displayedEvents: DisplayedEvent[] = []
    for (const event of events) {
      const daysInEvent = eachDayOfInterval({ start: event.startDate, end: event.endDate })
      let startDate = event.startDate
      for (const day of daysInEvent) {
        if (
          isSameDay(day, endOfWeek(day, { weekStartsOn: 1 }))
          || isSameDay(day, event.endDate)
        ) {
          if (
            areIntervalsOverlapping(
              { start: firstCellDate, end: lastCellDate },
              { start: startDate, end: day }
            )
          ) {
            const trackBy = `${event.id}-${format(startDate, 'yyyy-MM-dd')}-${format(day, 'dd-MM-yyyy')}`
            displayedEvents = [
              ...displayedEvents,
              {
                id: event.id,
                title: event.title,
                startDate,
                endDate: day,
                color: event.color,
                trackBy,
              }
            ]
          }
          startDate = addDays(day, 1)
        }
      }
    }
    return displayedEvents
  }
)

const selectClearedCells = createSelector(
  selectGeneratedCells,
  selectEvents,
  (cells: Cell[]): Cell[] => {
    for (const cell of cells) {
      cell.clearEvents()
    }
    return cells
  }
)

export const selectCells = createSelector(
  selectClearedCells,
  selectDisplayEvents,
  selectFirstCellDate,
  (cells: Cell[], events: DisplayedEvent[], firstCellDate: Date): Cell[] => {
    for (const event of events) {
      const row = cells[Math.abs(differenceInDays(event.startDate, firstCellDate))].firstFreeRow
      const eventLength = eachDayOfInterval({ start: event.startDate, end: event.endDate }).length
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
