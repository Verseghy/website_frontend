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

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {}

  changeDarkMode(dark: boolean) {
    if (dark) {
      this.document.querySelector('html').classList.add('dark')
      localStorage.setItem('dark-mode', 'true')
    } else {
      this.document.querySelector('html').classList.remove('dark')
      localStorage.setItem('dark-mode', 'false')
    }
  }
}
