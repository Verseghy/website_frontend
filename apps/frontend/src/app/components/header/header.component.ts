import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { combineLatest, fromEvent } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'verseghy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerAnimation', [
      state('true', style({
        height: '128px',
      })),
      state('false', style({
        height: '64px',
      })),
      transition('true <=> false', [
        animate('300ms'),
      ])
    ])
  ]
})
export class HeaderComponent {

  scrollEvent$ = fromEvent(document, 'scroll', { passive: true })
  useBigHeader$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(({ url }: NavigationEnd) => url === '/')
  )
  openHeader$ = combineLatest([this.scrollEvent$, this.useBigHeader$]).pipe(
    filter(([scroll, bigHeader]) => bigHeader),
    map(() => document.documentElement.scrollTop < 64)
  )

  drawer: boolean
  submenu1: boolean
  submenu2: boolean

  searchTerm: string

  constructor(private router: Router) {}

  search(event) {
    if (event.key === 'Enter') {
      this.router.navigate(['search', 'term', this.searchTerm])
      this.drawer = false
    }
  }
}
