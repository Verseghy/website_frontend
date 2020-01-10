import { AfterViewInit, ApplicationRef, Component } from '@angular/core'
import { animate, group, query, style, transition, trigger } from '@angular/animations'
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                zIndex: '8',
              }),
              animate(
                '100ms ease-out',
                style({
                  opacity: 1,
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
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        window.scrollTo(0, 0)
        this.loaded = false
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loaded = true
      }
    })
  }
}
