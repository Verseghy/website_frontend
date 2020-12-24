import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AuthFacade } from '../../../../state/auth/auth.facade'
import { CompetitionFacade } from '../../../../state/competition/competition.facade'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { debounceTime, map, withLatestFrom, pairwise } from 'rxjs/operators'
import { Problem } from '../../../../interfaces/problem.interface'
import { SubSink } from 'subsink'

@Component({
  selector: 'verseghy-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {
  private subs = new SubSink()

  pageProperties$ = new BehaviorSubject<PageEvent>({ pageIndex: 0, pageSize: 10, length: 0 })
  length$ = this.competitionFacade.problems$.pipe(map((problems) => problems.length))
  problems$ = combineLatest([this.competitionFacade.problems$, this.pageProperties$]).pipe(
    map(([problems, properties]) => {
      const start = properties.pageIndex * properties.pageSize
      const end = start + properties.pageSize
      return problems.slice(start, end)
    })
  )

  editProblem$ = new Subject<Problem>()
  newProblem$ = new Subject<void>()

  @ViewChild('paginator') paginator: MatPaginator

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    this.competitionFacade.loadProblems()
    this.subs.sink = this.editProblem$.pipe(debounceTime(1000)).subscribe((problem) => {
      this.competitionFacade.setProblem(problem)
    })
    this.subs.sink = this.newProblem$
      .pipe(
        withLatestFrom(this.competitionFacade.problems$),
        map(([_, problems]) => {
          return problems
        })
      )
      .subscribe((problems) => {
        const newID = problems[problems.length - 1].id + 1
        const newProblem: Problem = {
          id: newID,
          text: '',
        }
        this.competitionFacade.setProblem(newProblem)
      })

    this.subs.sink = this.competitionFacade.setProblemSuccess$.pipe(withLatestFrom(this.length$.pipe(pairwise()))).subscribe(([_, b]) => {
      if (b[0] !== b[1]) this.paginator.lastPage()
    })
  }

  logout() {
    this.authFacade.logout()
  }

  switchPage(event: PageEvent) {
    this.pageProperties$.next(event)
  }

  trackByFn(index: number, problem: Problem): number {
    return problem.id
  }

  input(event: Event, problem: Problem): void {
    const newProblem = Object.assign({}, problem)
    const target = event.target as HTMLTextAreaElement
    newProblem.text = target.value

    this.editProblem$.next(newProblem)
  }

  newProblem(): void {
    this.newProblem$.next()
  }

  remove(id: number): void {
    this.competitionFacade.removeProblem(id)
  }

  blur(event: Event, problem: Problem): void {
    const newProblem = Object.assign({}, problem)
    const target = event.target as HTMLTextAreaElement
    newProblem.text = target.value

    this.competitionFacade.setProblem(newProblem)
  }
}
