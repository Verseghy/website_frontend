import { Component, OnInit } from '@angular/core';
import { combineLatest, interval } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { TimeFacade } from '../../../../state/time/time.facade'
import { Router } from '@angular/router'

@Component({
  selector: 'verseghy-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  remainingTime$ = combineLatest([interval(1000), this.timeFacade.endTime$]).pipe(
    startWith([null, 'loading']),
    map(([, endline]) => {
      if (endline === 'loading') return '--:--:--'
      if (differenceInSeconds(endline, new Date()) > 0) {
        return (
          differenceInHours(endline, new Date())
            .toString()
            .padStart(2, '0') +
          ':' +
          ((differenceInMinutes(endline, new Date()) % 3600) % 60).toString().padStart(2, '0') +
          ':' +
          (differenceInSeconds(endline, new Date()) % 60).toString().padStart(2, '0')
        )
      } else {
        if (differenceInSeconds(endline, new Date()) === 0) {
          return '00:00:00'
        }
        this.router.navigate(['/']) // TODO(zoltanszepesi): endpage
        return '00:00:00'
      }
    })
  )

  constructor(
    private timeFacade: TimeFacade,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
