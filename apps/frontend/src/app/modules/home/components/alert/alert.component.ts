import { Component, OnInit } from '@angular/core';
import { AlertMessageFacade } from '../../state/alert-message/alert-message.facade'

@Component({
  selector: 'verseghy-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  loaded$ = this.alertMessageFacade.loaded$
  error$ = this.alertMessageFacade.error$
  alertMessages$ = this.alertMessageFacade.alertMessages$

  constructor(private alertMessageFacade: AlertMessageFacade) { }

  ngOnInit(): void {
    this.alertMessageFacade.queryMessages()
  }

}
