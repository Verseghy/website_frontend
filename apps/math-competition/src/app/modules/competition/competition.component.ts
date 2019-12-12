import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, interval, timer } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AuthFacade } from '../../state/auth/auth.facade'
import { differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { CompetitionFacade } from '../../state/competition/competition.facade'
import { TimeFacade } from '../../state/time/time.facade'
import { Router } from '@angular/router'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'verseghy-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  loaded = true
  page$ = new BehaviorSubject<number>(0)
  page = 0
  problems$ = this.competitionFacade.problems$.pipe(
    // TODO(zoltanszepesi): refactor this so we don't have to re-get the image every time
    switchMap( async arr => {
      return Promise.all(arr.map(async problem => {
        if (problem.hasImage) {
          problem.image = await this.afstorage.ref(`images/${problem.id}.png`).getDownloadURL().toPromise()
        }
        return problem
      }))
    })
  )
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

  constructor(
    private authFacade: AuthFacade,
    private competitionFacade: CompetitionFacade,
    private timeFacade: TimeFacade,
    private router: Router,
    private afstorage: AngularFireStorage
  ) {}

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

  scrollTo(id: number) {
    window.scrollTo({top: (document.querySelector('#problem-' + id) as HTMLDivElement).offsetTop - 24, behavior: 'smooth'})
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
