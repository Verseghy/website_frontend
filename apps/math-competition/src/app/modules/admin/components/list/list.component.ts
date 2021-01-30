import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { AuthFacade } from '../../../../state/auth/auth.facade'
import { CompetitionFacade } from '../../../../state/competition/competition.facade'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { debounceTime, map, withLatestFrom, pairwise } from 'rxjs/operators'
import { Problem } from '../../../../interfaces/problem.interface'
import { SubSink } from 'subsink'

@Component({
  selector: 'verseghy-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new SubSink()

  loaded = true
  page$ = new BehaviorSubject<number>(0)
  page = 0
  length$ = this.competitionFacade.problems$.pipe(map((problems) => problems.length))
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

  editProblem$ = new Subject<Problem>()
  newProblem$ = new Subject<void>()

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade) {}

  ngOnInit(): void {
    this.competitionFacade.loadProblems()

    this.subs.sink = this.editProblem$.pipe(debounceTime(1000)).subscribe((problem) => {
      this.competitionFacade.setProblem(problem)
    })

    this.subs.sink = this.newProblem$.pipe(
      withLatestFrom(this.competitionFacade.problems$),
      map(([_, problems]) => {
        return problems
      })
    ).subscribe((problems) => {
      const newID = problems[problems.length - 1].id + 1
      const newProblem = {
        id: newID,
        text: '',
      }
      this.competitionFacade.setProblem(newProblem)
    })

    this.subs.sink = this.competitionFacade.setProblemSuccess$.pipe(withLatestFrom(this.length$.pipe(pairwise()))).subscribe(([_, length]) => {
      if (length[0] !== length[1]) {
        this.page = Math.floor((length[1] - 1) / 10)
        this.page$.next(this.page)
      }
    })

    this.subs.sink = this.length$.pipe(pairwise()).subscribe((length) => {
      if (length[0] > length[1]) {
        this.page = Math.floor((length[1] - 1) / 10)
        this.page$.next(this.page)
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  logout(): void {
    this.authFacade.logout()
  }

  setText(event: Event, problem: Problem): void {
    const newProblem = Object.assign({}, problem)
    const target = event.target as HTMLTextAreaElement
    newProblem.text = target.value

    this.editProblem$.next(newProblem)
  }

  blurField(event: Event, problem: Problem): void {
    console.log('asdasd')

    const newProblem = Object.assign({}, problem)
    const target = event.target as HTMLTextAreaElement
    newProblem.text = target.value

    this.competitionFacade.setProblem(problem)
  }

  createProblem(): void {
    this.newProblem$.next()
  }

  deleteProblem(problem: Problem): void {
    this.competitionFacade.removeProblem(problem.id)
  }

  scrollTo(id: number): void {
    window.scrollTo({ top: (document.querySelector('#problem-' + id) as HTMLDivElement).offsetTop - 24, behavior: 'smooth' })
    const input: HTMLInputElement = document.querySelector(`#problem-${id} input`)
    input.focus({ preventScroll: true })
  }

  prevPage(): void {
    this.page$.next(--this.page)
    window.scrollTo(0, 0)
  }

  nextPage(): void {
    this.page$.next(++this.page)
    window.scrollTo(0, 0)
  }

  trackByFn(index, item): number {
    return item.id
  }
}
