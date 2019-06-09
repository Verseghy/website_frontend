export interface DisplayedEvent {
  id: number
  title: string
  startDate: Date
  endDate?: Date
  color?: string
  trackBy: string
}

export interface Settings {
  today?: string
  moreEvent?: string
}

export interface CalendarEvent {
  id: number
  title: string
  description: string
  startDate: Date
  endDate: Date
  color: string
}

export interface PopupSettings {
  visible: boolean
  top: number
  left: number
  date: string
  title?: string
  description?: string
  color?: string
  day?: string
  events?: {
    id: number
    title: string
    color: string
  }[]
}

export interface Cell {
  date: string
  today: boolean
  anotherMonth: boolean
  rows: Map<number, {
    placeholder?: boolean
    event?: {
      id: number
      title: string
      color: string
      width: string
      top: number
    }
  }>
}