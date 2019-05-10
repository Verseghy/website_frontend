import { Component, OnInit } from '@angular/core'
import { CalendarComponent } from '../calendar.component'
import { MatDialogRef } from '@angular/material/dialog'
import { format, isSameDay, isSameMonth, isSameYear } from 'date-fns'
import { hu } from 'date-fns/locale'
import { CalendarEvent } from '../calendar.interfaces'
import { Store, select } from '@ngrx/store'
import { CELLS_FEATURE_KEY } from '../+state/cells.reducer'
import { map, filter } from 'rxjs/operators'
import { cellsQuery } from '../+state/cells.selectors'

@Component({
  selector: 'verseghy-more-details-dialog',
  templateUrl: './more-details-dialog.component.html',
  styleUrls: ['./more-details-dialog.component.css'],
})
export class MoreDetailsDialogComponent implements OnInit {
  public data = this.store.pipe(
    select(cellsQuery.selectedEvent),
    filter(event => !!event)
  )

  public formatedTime = this.store.pipe(
    select(cellsQuery.selectedEvent),
    filter(event => !!event),
    map((event: CalendarEvent) => {
      let second = ''
      let startDate = format(event.startDate, 'Y. MMMM dd.', { locale: hu })
      if (!isSameYear(event.startDate, event.endDate)) {
        second = `- ${format(event.endDate, 'Y. MMMM dd.', { locale: hu })}`
      } else if (!isSameMonth(event.startDate, event.endDate)) {
        second = `- ${format(event.endDate, 'MMMM dd.', { locale: hu })}`
      } else if (!isSameDay(event.startDate, event.endDate)) {
        second = `- ${format(event.endDate, 'dd.', { locale: hu })}`
        startDate = startDate.slice(0, -1)
      }
      return `${startDate} ${second}`
    })
  )

  constructor(private thisDialogRef: MatDialogRef<CalendarComponent>, private store: Store<any>) {}

  ngOnInit() {}

  closeDialog() {
    this.thisDialogRef.close()
  }
}
