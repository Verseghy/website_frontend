import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { animate, animateChild, group, query, stagger, state, style, transition, trigger } from '@angular/animations'
import { combineLatest, fromEvent, of } from 'rxjs'
import { filter, map, startWith, tap } from 'rxjs/operators'
import { HeaderService } from '../../services/header.service'

const openCloseAnimation = (open: boolean) => {
  return [
    group([
      query('@headerAnimationImage', animateChild()),
      query('@headerAnimationRight', animateChild()),
      query('@headerAnimationTitle', animateChild()),
      query('@headerAnimationWeb', animateChild({ delay: open ? 0 : 170 })),
      query('@headerAnimationTitleEnd', animateChild({ delay: open ? 170 : 0 })),
      animate('300ms'),
    ]),
  ]
}

@Component({
  selector: 'verseghy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerAnimation', [
      state('open', style({
        height: '128px',
      })),
      state('close', style({
        height: '64px',
      })),
      transition('close => open', openCloseAnimation(true)),
      transition('open => close', openCloseAnimation(false)),
    ]),
    trigger('headerAnimationWeb', [
      state('open', style({
        opacity: 0,
      })),
      state('close', style({
        opacity: 1,
      })),
      transition('open <=> close', [
        animate('300ms')
      ])
    ]),
    trigger('headerAnimationTitleEnd', [
      state('open', style({
        opacity: 1,
      })),
      state('close', style({
        opacity: 0,
      })),
      transition('open <=> close', [
        animate('300ms')
      ])
    ]),
    trigger('headerAnimationRight', [
      state('open', style({
        transform: 'scale(1.3)',
      })),
      state('close', style({
        transform: 'scale(1)',
      })),
      transition('open <=> close', [
        animate('300ms')
      ])
    ]),
    trigger('headerAnimationTitle', [
      state('open', style({
        letterSpacing: '1px',
      })),
      state('close', style({
        letterSpacing: '0px',
      })),
      transition('open <=> close', [
        animate('300ms')
      ])
    ]),
    trigger('headerAnimationImage', [
      state('open', style({
        height: '84px',
      })),
      state('close', style({
        height: '48px',
      })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent {

  scrollEvent$ = fromEvent(document, 'scroll', { passive: true }).pipe(startWith(0))
  resizeEvent$ = fromEvent(window, 'resize', { passive: true }).pipe(startWith(0))
  openHeader$ = combineLatest([this.headerService.useBigHeader$, this.scrollEvent$, this.resizeEvent$]).pipe(
    tap(console.log),
    map(([bigHeader]) => {
      if (bigHeader === 'undefined') return 'undefined'
      if (window.innerWidth <= 992 || bigHeader === 'false') return 'close'
      return document.documentElement.scrollTop < 64 ? 'open' : 'close'
    })
  )


  drawer: boolean
  submenu1: boolean
  submenu2: boolean

  searchTerm: string

  constructor(private router: Router, private headerService: HeaderService) {}

  search(event) {
    if (event.key === 'Enter') {
      this.router.navigate(['search', 'term', this.searchTerm])
      this.drawer = false
    }
  }
}
