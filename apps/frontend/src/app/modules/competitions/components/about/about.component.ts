import { Component, OnInit } from '@angular/core'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'
import { Observable } from 'rxjs'
import { Competition } from '../../models/competition'

@Component({
  selector: 'verseghy-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  competition$: Observable<Competition>

  constructor(private facade: CompetitionsFacade) {}

  ngOnInit(): void {
    this.competition$ = this.facade.selectedCompetition$
  }
}
