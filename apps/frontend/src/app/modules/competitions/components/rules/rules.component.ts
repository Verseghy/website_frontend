import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Competition } from '../../models/competition'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'

@Component({
  selector: 'verseghy-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  competition$: Observable<Competition>

  constructor(private facade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competition$ = this.facade.selectedCompetition$
  }

}
