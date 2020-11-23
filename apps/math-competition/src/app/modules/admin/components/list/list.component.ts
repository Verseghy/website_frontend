import { Component, OnInit } from '@angular/core'
import { AuthFacade } from '../../../../state/auth/auth.facade'
import { CompetitionFacade } from '../../../../state/competition/competition.facade'
import { PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
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

  constructor(private authFacade: AuthFacade, private competitionFacade: CompetitionFacade) {}

  ngOnInit(): void {
    this.competitionFacade.loadProblems()
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

    // TODO: remove this
    // @ts-ignore
    delete newProblem.type

    this.competitionFacade.setProblem(problem)
  }

  newProblem(): void {
    console.log('new problem')
  }
}
