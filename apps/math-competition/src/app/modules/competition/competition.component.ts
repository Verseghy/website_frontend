import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'
import { CompetitionFacade } from '../../state/competition/competition.facade'
import { SubSink } from 'subsink'
import { Router } from '@angular/router'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionComponent implements OnInit, OnDestroy {
  private subs = new SubSink()

  loaded = true
  page$ = new BehaviorSubject<number>(0)
  page = 0
  problems$ = this.competitionFacade.mergedSolutionsAndProblems$
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

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade, private router: Router) {}

  ngOnInit() {
    this.competitionFacade.loadCompetition()

    this.subs.sink = this.authFacade.uid$.subscribe((uid) => {
      if (!uid) this.router.navigate(['/login'])
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  setSolution(id: number, event: Event) {
    const target = event.target as HTMLInputElement
    if (/^[0-9]*$/g.test(target.value)) {
      this.competitionFacade.sendSolution(id, Number(target.value))
    }
  }

  logout() {
    this.authFacade.logout()
  }

  blurField(event: KeyboardEvent) {
    if (event.key === 'Enter') (event.target as HTMLInputElement).blur()
  }

  scrollTo(id: number) {
    window.scrollTo({ top: (document.querySelector('#problem-' + id) as HTMLDivElement).offsetTop - 24, behavior: 'smooth' })
    const input: HTMLInputElement = document.querySelector(`#problem-${id} input`)
    input.focus({ preventScroll: true })
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
