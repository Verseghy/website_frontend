import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID } from '@angular/core'
import { Router } from '@angular/router'
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations'
import { combineLatest, fromEvent, Observable, of } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { HeaderService } from '../../services/header.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common'

const openCloseAnimation = (open: boolean) => {
  return [
    group([
      query('@headerAnimationImage', animateChild()),
      query('@headerAnimationRight', animateChild()),
      query('@headerAnimationTitle', animateChild()),
      query('@headerAnimationWeb', animateChild({ delay: open ? 0 : 170 })),
      query('@headerAnimationTitleEnd', animateChild({ delay: open ? 170 : 0 })),
      query('@headerAnimationLogoBottom', animateChild({ delay: open ? 100 : 0 })),
      animate('300ms ease-in-out'),
    ]),
  ]
}

@Component({
  selector: 'verseghy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('headerAnimation', [
      state(
        'open',
        style({
          height: '128px',
        })
      ),
      state(
        'close',
        style({
          height: '64px',
        })
      ),
      transition('close => open', openCloseAnimation(true)),
      transition('open => close', openCloseAnimation(false)),
    ]),
    trigger('headerAnimationWeb', [
      state(
        'open',
        style({
          opacity: 0,
        })
      ),
      state(
        'close',
        style({
          opacity: 1,
        })
      ),
      transition('open <=> close', [animate('300ms')]),
    ]),
    trigger('headerAnimationTitleEnd', [
      state(
        'open',
        style({
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
        })
      ),
      transition('open <=> close', [animate('300ms')]),
    ]),
    trigger('headerAnimationRight', [
      state(
        'open',
        style({
          transform: 'scale3d(1.4, 1.4, 1.4)',
        })
      ),
      state(
        'close',
        style({
          transform: 'scale3d(1, 1, 1)',
        })
      ),
      transition('open <=> close', [animate('300ms')]),
    ]),
    trigger('headerAnimationTitle', [
      state(
        'open',
        style({
          letterSpacing: '1px',
        })
      ),
      state(
        'close',
        style({
          letterSpacing: '0px',
        })
      ),
      transition('open <=> close', [animate('300ms')]),
    ]),
    trigger('headerAnimationImage', [
      state(
        'open',
        style({
          height: '75px',
        })
      ),
      state(
        'close',
        style({
          height: '48px',
        })
      ),
      transition('open <=> close', [animate('300ms ease-in-out')]),
    ]),
    trigger('headerAnimationLogoBottom', [
      state(
        'open',
        style({
          opacity: '1',
          letterSpacing: '0',
        })
      ),
      state(
        'close',
        style({
          opacity: '0',
          letterSpacing: '-5px',
        })
      ),
      transition('open => close', [animate('150ms ease-in-out')]),
      transition('close => open', [animate('150ms ease-in-out')]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  scrollEvent$ = fromEvent(this.document, 'scroll', { passive: true }).pipe(startWith(0))
  resizeEvent$ = globalThis.window ? fromEvent(globalThis.window, 'resize', { passive: true }).pipe(startWith(0)) : new Observable<never>()
  openHeader$ = isPlatformBrowser(this.platformID)
    ? combineLatest([this.headerService.useBigHeader$, this.scrollEvent$, this.resizeEvent$]).pipe(
        map(([bigHeader]) => {
          if (bigHeader === 'undefined') return 'undefined'
          if ((globalThis.window && globalThis.window.innerWidth <= 992) || bigHeader === 'false') return 'close'
          return this.document.documentElement.scrollTop < 64 ? 'open' : 'close'
        })
      )
    : of('close')

  drawer: boolean
  submenu1: boolean
  submenu2: boolean

  searchTerm: string

  constructor(
    private router: Router,
    private headerService: HeaderService,
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformID
  ) {}

  search(event) {
    if (event.key === 'Enter') {
      this.router.navigate(['search', 'term', this.searchTerm])
      this.drawer = false
    }
  }
}
