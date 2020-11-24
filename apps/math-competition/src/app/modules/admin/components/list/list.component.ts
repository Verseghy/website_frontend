import { Component, OnInit } from '@angular/core'
import { AuthFacade } from '../../../../state/auth/auth.facade'
import { CompetitionFacade } from '../../../../state/competition/competition.facade'
import { PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, combineLatest, Subject } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { Problem } from '../../../../interfaces/problem.interface'

@Component({
  selector: 'verseghy-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade) {}

  ngOnInit(): void {
    this.competitionFacade.loadProblems()
    this.editProblem$.pipe(debounceTime(1000)).subscribe((problem) => {
      this.competitionFacade.setProblem(problem)
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
    console.log('new problem')
  }
}
