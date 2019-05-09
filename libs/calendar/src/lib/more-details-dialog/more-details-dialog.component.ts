import { Component, OnInit, Inject } from '@angular/core'
import { CalendarComponent } from '../calendar.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { CalendarEvent } from '../calendar.interfaces'
import { format, isSameDay, isSameMonth, isSameYear } from 'date-fns'
import { hu } from 'date-fns/locale'

@Component({
  selector: 'verseghy-more-details-dialog',
  templateUrl: './more-details-dialog.component.html',
  styleUrls: ['./more-details-dialog.component.css']
})
export class MoreDetailsDialogComponent implements OnInit {

  constructor(
    private thisDialogRef: MatDialogRef<CalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEvent  
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.thisDialogRef.close()
  }

  get formatedTime(): string {
    let second = ""
    let startDate = format(this.data.startDate, 'Y. MMMM dd.', { locale: hu })
    if (!isSameYear(this.data.startDate, this.data.endDate)) {
      second = `- ${format(this.data.endDate, 'Y. MMMM dd.', { locale: hu })}`
    } else if (!isSameMonth(this.data.startDate, this.data.endDate)) {
      second = `- ${format(this.data.endDate, 'MMMM dd.', { locale: hu })}`
    } else if (!isSameDay(this.data.startDate, this.data.endDate)) {
      second = `- ${format(this.data.endDate, 'dd.', { locale: hu })}`
      startDate = startDate.slice(0, -1);
    }
    return `${startDate} ${second}`
  }
}
