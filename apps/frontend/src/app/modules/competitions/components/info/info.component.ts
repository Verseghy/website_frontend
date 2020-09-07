import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'
import { SubSink } from 'subsink'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'verseghy-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  private subsink = new SubSink()

  loaded$: Observable<boolean>

  constructor(private route: ActivatedRoute, private facade: CompetitionsFacade) { }

  ngOnInit() {
    this.subsink.sink = this.route.params.subscribe(params => {
      if (!('id' in params)) return
      if (isNaN(params.id)) return
      // this.facade.queryRecentCompetitions()
      this.facade.selectCompetition(params.id)
    })

    this.loaded$ = this.facade.selectedCompetition$.pipe(map(competition => !!competition))
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }

}
