import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Competition } from '../../models/competition'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'
import { format, isSameDay, isSameHour, isSameMinute, isSameMonth, isSameYear } from 'date-fns'

@Component({
  selector: 'verseghy-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  competition$: Observable<Competition>

  constructor(private facade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competition$ = this.facade.selectedCompetition$
  }

  formatTime(start: Date, end: Date) {
    let formatedDate = format(start, 'YYYY-MM-DD HH:mm - ')

    if (!isSameYear(start, end)) {
      formatedDate += format(end, ' YYYY-MM-DD HH:mm')
    } else {
      if (!isSameMonth(start, end)) {
        formatedDate += format(end, ' MM-DD HH:mm')
      } else {
        if (!isSameDay(start, end)) {
          formatedDate += format(end, ' DD HH:mm')
        } else {
          if (!isSameHour(start, end)) {
            formatedDate += format(end, ' HH:mm')
          } else {
            if (!isSameMinute(start, end)) {
              formatedDate += format(end, ' mm')
            }
          }
        }
      }
    }

    return formatedDate
  }

}
