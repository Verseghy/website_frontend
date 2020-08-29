import { Component, OnInit } from '@angular/core'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private competitionsFacade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competitionsFacade.queryRecentCompetitions()
  }

}
