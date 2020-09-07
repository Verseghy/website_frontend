import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Competition } from '../../models/competition'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'

@Component({
  selector: 'verseghy-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  competition$: Observable<Competition>

  constructor(private facade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competition$ = this.facade.selectedCompetition$
  }

}
