import { Component, OnInit } from '@angular/core'
import { CompetitionsFacade } from '../../state/competitions/competitions.facade'
import { CompetitionRegistration } from '../../models/competition'

@Component({
  selector: 'verseghy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  competitions$ = this.competitionsFacade.competitions$

  constructor(private competitionsFacade: CompetitionsFacade) { }

  ngOnInit(): void {
    this.competitionsFacade.queryRecentCompetitions()
  }

  isRegistrationOpen(registration: CompetitionRegistration): boolean {
    const now = new Date().getTime()
    return now >= registration.start.toMillis() && now <= registration.end.toMillis();
  }

}
