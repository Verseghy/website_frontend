export interface DisplayedEvent {
  id: number
  title: string
  startDate: Date
  endDate?: Date
  color?: string
}

export interface Settings {
  shortDayNames?: string[]
  shortMonthNames?: string[]
  monthNames?: string[]
  today?: string
  moreEvent?: string
}

export interface CalendarEvent {
  id: number,
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  color: string
}