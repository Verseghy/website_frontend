import { Component, OnInit } from '@angular/core'
import { AuthFacade } from './state/auth/auth.facade'
import { TimeFacade } from './state/time/time.facade'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthFacade, private timeFacade: TimeFacade) {}

  ngOnInit() {
    this.authFacade.init()
    this.timeFacade.init()
  }
}
