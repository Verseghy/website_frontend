import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'
import { SubSink } from 'subsink'

@Component({
  selector: 'verseghy-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  private subsink = new SubSink()

  constructor(private route: ActivatedRoute, private facade: CompetitionsFacade) { }

  ngOnInit() {
    this.subsink.sink = this.route.params.subscribe(params => {
      if (!('id' in params)) return
      if (isNaN(params.id)) return
      this.facade.selectCompetition(params.id)
    })
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }

}
