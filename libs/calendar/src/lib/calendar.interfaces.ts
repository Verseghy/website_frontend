export interface DisplayedEvent {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  color?: string;
}

export interface Settings {
  shortDayNames?: string[];
}
