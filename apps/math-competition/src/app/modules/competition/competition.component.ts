import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { CompetitionFacade } from '../../state/competition/competition.facade'
import { TimeFacade } from '../../state/time/time.facade'
import { Router } from '@angular/router'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  remainingTime = combineLatest([interval(1000), this.timeFacade.endTime$]).pipe(
    map(
      ([, endline]) => {
        if (differenceInSeconds(endline, new Date()) > 0) {
          return differenceInHours(endline, new Date())
              .toString()
              .padStart(2, '0') +
            ':' +
            ((differenceInMinutes(endline, new Date()) % 3600) % 60).toString().padStart(2, '0') +
            ':' +
            (differenceInSeconds(endline, new Date()) % 60).toString().padStart(2, '0')
        } else {
          if (differenceInSeconds(endline, new Date()) === 0) {
            this.router.navigate(['/'])
            return '00:00:00'
          } else {
            throw new Error("Date difference is negative");
          }
        }
      }
    )
  )
  loaded = true
  page$ = new BehaviorSubject<number>(0)
  page = 0
  problems$ = this.competitionFacade.problems$
  paginated$ = combineLatest([this.problems$, this.page$]).pipe(
    map(([arr, page]) => {
      return arr.slice(page * 10, (page + 1) * 10)
    })
  )
  disableNextPage$ = combineLatest([this.problems$, this.page$]).pipe(
    map(([arr, page]) => {
      return page + 1 >= arr.length / 10
    })
  )
  disablePrevPage$ = combineLatest([this.problems$, this.page$]).pipe(
    map(([, page]) => {
      return page - 1 < 0
    })
  )

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade, private timeFacade: TimeFacade, private router: Router) {}

  ngOnInit() {
    this.competitionFacade.loadCompetition()
  }

  setSolution(id: number, solution: number) {
    this.competitionFacade.sendSolution(id, solution)
  }

  logout() {
    this.authFacade.logout()
  }

  blurField(event: KeyboardEvent) {
    if (event.key === 'Enter') (event.target as HTMLInputElement).blur()
  }

  prevPage() {
    this.page$.next(--this.page)
    window.scrollTo(0, 0)
  }

  nextPage() {
    this.page$.next(++this.page)
    window.scrollTo(0, 0)
  }

  trackByFn(index, item) {
    return item.id
  }
}
