import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, interval } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  TEMPendline = new Date().setMinutes(new Date().getMinutes() + 25)
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
  loaded = false
  page$ = new BehaviorSubject<number>(0)
  page = 0
  TEMPdescription =
    'Mennyi a következő összeg pontos értéke? $\\left( ctg \\left ( \\frac{\\pi}{4} + \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + \\pi \\right ) )^2 + (ctg \\left ( \\frac{\\pi}{4} + 2\\pi \\right) + tg \\left ( \\frac{\\pi}{4} +2 \\pi \\right ) )^2 + … + (ctg \\left ( \\frac{\\pi}{4} +188 \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + 188 \\pi \\right ) \\right)^2$'
  TEMParr$ = new BehaviorSubject<any[]>([])
  paginated$ = combineLatest([this.TEMParr$, this.page$]).pipe(
    map(([arr, page]) => {
      return arr.slice(page * 10, (page + 1) * 10)
    })
  )
  disableNextPage$ = combineLatest([this.TEMParr$, this.page$]).pipe(
    map(([arr, page]) => {
      return page + 1 > arr.length / 10
    })
  )
  disablePrevPage$ = combineLatest([this.TEMParr$, this.page$]).pipe(
    map(([, page]) => {
      return page - 1 < 0
    })
  )

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    setTimeout(() => {
      const arr = []
      for (let i = 0; i < 189; i++) {
        arr.push({
          id: i,
          description: this.TEMPdescription,
        })
      }
      this.TEMParr$.next(arr)
      setTimeout(() => {
        ;(window as any).MathJax.typesetPromise().then(() => {
          this.loaded = true
        })
      })
    }, 0)
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
