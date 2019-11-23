import { Component, Inject, OnInit } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'verseghy-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  get darkValue(): boolean {
    if (localStorage.getItem('dark-mode') === 'true') {
      return true
    } else {
      return this.document.body.classList.contains('dark-mode')
    }
  }

  set darkValue (val) {
    if (val) {
      this.document.body.classList.add('dark-mode')
      localStorage.setItem('dark-mode', 'true')
    } else {
      this.document.body.classList.remove('dark-mode')
      localStorage.setItem('dark-mode', 'false')
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}
}
