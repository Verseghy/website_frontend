import { AfterViewInit, ApplicationRef, Component } from '@angular/core'
import { animate, group, query, style, transition, trigger } from '@angular/animations'
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateY(50px)',
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                zIndex: '8',
              }),
              animate(
                '100ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateY(0)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({
                opacity: 1,
              }),
              animate('100ms', style({ opacity: 0 })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements AfterViewInit {
  loaded = false
  constructor(private router: Router, private appref: ApplicationRef) {}

  ngAfterViewInit(): void {
    this.appref.isStable.subscribe(x => {
      console.log(x)
    })

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaded = false
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loaded = true
        ;(window as any).ga('tracker.send', 'pageview', location.pathname)
      }
    })
  }
}
