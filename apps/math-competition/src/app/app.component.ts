import { Component, OnInit } from '@angular/core'
import { AuthFacade } from './state/auth/auth.facade'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor (
    private authFacade: AuthFacade
  ) {}

  ngOnInit () {
    this.authFacade.init()
  }
}
