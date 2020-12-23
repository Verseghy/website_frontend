import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { combineLatest, interval } from 'rxjs'
import { TimeFacade } from '../../state/time/time.facade'
import { map, startWith } from 'rxjs/operators'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Router } from '@angular/router'

@Component({
  selector: 'verseghy-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaitingComponent implements OnInit {
  time$ = combineLatest([interval(1000), this.timeFacade.startTime$]).pipe(
    startWith([null, 'loading']),
    map(([, start]) => {
      if (start === 'loading') return '--:--:--'
      if (differenceInSeconds(start, new Date()) > 0) {
        return (
          differenceInHours(start, new Date())
            .toString()
            .padStart(2, '0') +
          ':' +
          ((differenceInMinutes(start, new Date()) % 3600) % 60).toString().padStart(2, '0') +
          ':' +
          (differenceInSeconds(start, new Date()) % 60).toString().padStart(2, '0')
        )
      } else {
        if (differenceInSeconds(start, new Date()) === 0) {
          return '00:00:00'
        }
        this.router.navigate(['/competition'])
        return '00:00:00'
      }
    })
  )

  constructor(private timeFacade: TimeFacade, private router: Router) {}

  ngOnInit() {}
}
