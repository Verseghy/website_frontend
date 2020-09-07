import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Competition } from '../../models/competition'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'

@Component({
  selector: 'verseghy-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  competition$: Observable<Competition>

  constructor(private facade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competition$ = this.facade.selectedCompetition$
  }

}
