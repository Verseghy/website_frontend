import { Component, OnDestroy, OnInit } from '@angular/core'
import { animate, group, query, style, transition, trigger } from '@angular/animations'
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'
import { SubSink } from 'subsink'

@Component({
  selector: 'verseghy-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
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
export class MainLayoutComponent implements OnInit, OnDestroy {
  subsink = new SubSink()

  // TODO(TwoDCube): fix this!!!
  loaded = true
  constructor(private router: Router) {}

  ngOnInit(): void {
    // this.subsink.sink = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     window.scrollTo(0, 0)
    //     this.loaded = false
    //   } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
    //     this.loaded = true
    //   }
    // })
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }
}
