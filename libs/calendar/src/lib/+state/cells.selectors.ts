import { CellsState, CELLS_FEATURE_KEY } from './cells.reducer'
import { createSelector } from '@ngrx/store'
import { CalendarEvent, DisplayedEvent, Cell } from '../calendar.interfaces'
import {
  isSunday,
  startOfMonth,
  isSaturday,
  getDaysInMonth,
  startOfWeek,
  addDays,
  differenceInDays,
  isSameDay,
  isSameMonth,
  areIntervalsOverlapping,
  format,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  getDate
} from 'date-fns'
import { hu } from 'date-fns/locale'

const selectFeature = (state: any) => {
  return state[CELLS_FEATURE_KEY]
}

const selectEvents = createSelector(
  selectFeature,
  (state: CellsState) => state.events
)

const selectMonth = createSelector(
  selectFeature,
  (state: CellsState) => state.month
)

const selectSelectedEvent = createSelector(
  selectFeature,
  (state: CellsState) => state.selectedEvent
)

const selectSelectedMoreEvent = createSelector(
  selectFeature,
  (state: CellsState) => state.selectedMoreEvents
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
      const overlap = areIntervalsOverlapping({ start: firstCellDate, end: lastCellDate }, { start: event.startDate, end: event.endDate })
      if (overlap) eventsInMonth = [...eventsInMonth, event]
    }
    return eventsInMonth
  }
)

const selectGeneratedCells = createSelector(
  selectRowsInMonth,
  selectFirstCellDate,
  selectMonth,
  (rows: number, firstCellDate: Date, month: Date): Cell[] => {
    let cellsInMonth: Cell[] = []
    for (let i = 0; i < 7 * rows; i++) {
      const date = addDays(firstCellDate, i)
      let formatedDate = format(date, 'd')
      if (getDate(date) === 1) formatedDate = format(date, 'LLL d', { locale: hu })
      const today = isSameDay(date, new Date())
      const anotherMonth = !isSameMonth(date, month)
      /*const cellHeight = (hostHeight - 68) / rows - 32
      const maxRows = Math.floor(cellHeight / 24)*/
      const cell: Cell = {
        date: formatedDate,
        today,
        anotherMonth,
        rows: new Map()
      } 
      cellsInMonth = [...cellsInMonth, cell]
    }
    return cellsInMonth
  }
)

const selectDisplayedEvents = createSelector(
  selectCalendarEventsInMonth,
  selectFirstCellDate,
  selectLastCellDate,
  (events: CalendarEvent[], firstCellDate: Date, lastCellDate: Date): DisplayedEvent[] => {
    let displayedEvents: DisplayedEvent[] = []
    for (const event of events) {
      const daysInEvent = eachDayOfInterval({ start: event.startDate, end: event.endDate })
      let startDate = event.startDate
      for (const day of daysInEvent) {
        if (isSameDay(day, endOfWeek(day, { weekStartsOn: 1 })) || isSameDay(day, event.endDate)) {
          if (areIntervalsOverlapping({ start: firstCellDate, end: lastCellDate }, { start: startDate, end: day })) {
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
              },
            ]
          }
          startDate = addDays(day, 1)
        }
      }
    }
    return displayedEvents
  }
)

const selectCellsWithEvents = createSelector(
  selectGeneratedCells,
  selectDisplayedEvents,
  selectFirstCellDate,
  (cells: Cell[], events: DisplayedEvent[], firstCellDate: Date): Cell[] => {
    for (const event of events) {
      const firstCell = cells[Math.abs(differenceInDays(event.startDate, firstCellDate))]
      let row = 0
      for (let i = 0; i < Math.max(...Array.from(firstCell.rows.keys())) + 1; i++) {
        if (!firstCell.rows.has(i)) {
          row = i
          break
        }
      }
      let isPlaceholder = false
      for (const day of eachDayOfInterval({start: event.startDate, end: event.endDate})) {
        const cell = cells[Math.abs(differenceInDays(day, firstCellDate))]
        let rowObject = {}
        if (!isPlaceholder) {
          const eventLength = Math.abs(differenceInDays(event.startDate, event.endDate))
          const formatedEventLength = `calc(${eventLength + 1}00% - 4px + ${eventLength}px`
          const top = row * 24
          rowObject = {
            placeholder: false,
            event: {
              title: event.title,
              color: event.color,
              id: 1,
              width: formatedEventLength,
              top
            }
          }
        } else {
          rowObject = {
            placeholder: true
          }
        }
        cell.rows.set(row, rowObject)
        isPlaceholder = true
      }
    }
    return cells
  }
)

const selectFilteredCells = createSelector(
  selectCellsWithEvents,
  (cells: Cell[]): Cell[] => {
    for (const cell of cells) {
      cell.rows.forEach((value,index,z) => {
        console.log(index, value)
      })
    }
    
    return cells
    /*return cells.map(cell => {
      console.log(cell.rows)
      //console.log(cell.rows.filter(item => !item.placeholder))
      return cell
    })*/
  }
)

const selectCells = createSelector(
  selectFilteredCells,
  selectDisplayedEvents,
  selectFirstCellDate,
  (cells: Cell[], events: DisplayedEvent[], firstCellDate: Date): Cell[] => {
    /*for (const event of events) {
      const row = cells[Math.abs(differenceInDays(event.startDate, firstCellDate))].firstFreeRow
      const eventLength = eachDayOfInterval({ start: event.startDate, end: event.endDate }).length
      for (let i = 0; i < eventLength; i++) {
        const cell = cells[Math.abs(differenceInDays(addDays(event.startDate, i), firstCellDate))]
        const placeholder = i !== 0
        cell.push(event.id, row, event.title, eventLength, event.color, placeholder)
      }
    }
    return cells*/
    console.log(cells)
    return cells
  }
)

const selectedEvent = createSelector(
  selectSelectedEvent,
  selectEvents,
  (eventId: number, events: CalendarEvent[]): CalendarEvent => {
    for (const event of events) {
      if (event.id === eventId) {
        return event
      }
    }
    return null
  }
)

const selectedMoreEvents = createSelector(
  selectSelectedMoreEvent,
  selectEvents,
  (day: Date, events: CalendarEvent[]): CalendarEvent[] => {
    let eventsInDay = []
    for (const event of events) {
      if (areIntervalsOverlapping({ start: event.startDate, end: event.endDate }, { start: startOfDay(day), end: endOfDay(day) })) {
        eventsInDay = [...eventsInDay, event]
      }
    }
    return eventsInDay
  }
)

export const cellsQuery = {
  selectCells,
  selectedEvent,
  selectedMoreEvents,
  selectMonth,
}
