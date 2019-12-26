import { Component, Inject, OnInit } from '@angular/core'
import { AuthFacade } from './state/auth/auth.facade'
import { TimeFacade } from './state/time/time.facade'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthFacade, private timeFacade: TimeFacade, @Inject(DOCUMENT) private document) {}

  ngOnInit() {
    this.authFacade.init()
    this.timeFacade.init()
    if (localStorage.getItem('dark-mode') === undefined) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('dark-mode', 'true')
      } else {
        localStorage.setItem('dark-mode', 'false')
      }
    }
    if (localStorage.getItem('dark-mode') === 'true') {
      this.document.body.classList.add('dark-mode')
    }
  }
}
