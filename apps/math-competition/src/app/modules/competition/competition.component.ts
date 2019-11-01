import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'
import { addHours, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { CompetitionFacade } from '../../state/competition/competition.facade'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  TEMPendline = addHours(new Date(), 4)
  remainingTime = interval(1000).pipe(
    map(
      () =>
        differenceInHours(this.TEMPendline, new Date())
          .toString()
          .padStart(2, '0') +
        ':' +
        ((differenceInMinutes(this.TEMPendline, new Date()) % 3600) % 60).toString().padStart(2, '0') +
        ':' +
        (differenceInSeconds(this.TEMPendline, new Date()) % 60).toString().padStart(2, '0')
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

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade) {}

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
    setTimeout(() => (window as any).MathJax.typesetPromise())
    window.scrollTo(0, 0)
  }

  nextPage() {
    this.page$.next(++this.page)
    setTimeout(() => (window as any).MathJax.typesetPromise())
    window.scrollTo(0, 0)
  }
}
