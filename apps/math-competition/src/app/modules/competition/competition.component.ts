import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  remainingTime = '00:00:00'
  loaded = false
  page$ = new BehaviorSubject<number>(0)
  page = 0
  TEMPdescription = 'Mennyi a következő összeg pontos értéke? $\\left( ctg \\left ( \\frac{\\pi}{4} + \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + \\pi \\right ) )^2 + (ctg \\left ( \\frac{\\pi}{4} + 2\\pi \\right) + tg \\left ( \\frac{\\pi}{4} +2 \\pi \\right ) )^2 + … + (ctg \\left ( \\frac{\\pi}{4} +188 \\pi \\right) + tg \\left ( \\frac{\\pi}{4} + 188 \\pi \\right ) \\right)^2$'
  TEMParr$ = new BehaviorSubject<any[]>([])
  paginated$ = combineLatest([this.TEMParr$, this.page$]).pipe(
    map(([arr, page]) => {
      return arr.slice(page*10, (page+1)*10)
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

  constructor(
    private authFacade: AuthFacade
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.TEMParr$.next(Array(189))
      setTimeout(() => {(window as any).MathJax.typesetPromise().then(() => {
        this.loaded = true
      })})
    }, 0)
  }

  logout () {
    this.authFacade.logout()
  }

  blurField (event: KeyboardEvent) {
    if (event.key === 'Enter') (event.target as HTMLInputElement).blur()
  }

  prevPage () {
    this.page$.next(--this.page)
  }

  nextPage () {
    this.page$.next(++this.page)
  }



}
