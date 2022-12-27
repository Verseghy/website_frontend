import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core'
import { animate, group, query, style, transition, trigger } from '@angular/animations'
import { NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router'
import { SwUpdate } from '@angular/service-worker'
import { filter, first } from 'rxjs/operators'
import { concat, interval } from 'rxjs'
import { ToastService } from './services/toast.service'
import { HeaderService } from './services/header.service'
import { environment } from '../environments/environment'
import { Meta } from '@angular/platform-browser'
import { isPlatformBrowser } from "@angular/common";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit, OnInit {
  loaded = false

  constructor(
    private router: Router,
    private swupdate: SwUpdate,
    private appRef: ApplicationRef,
    private toastService: ToastService,
    private headerSevice: HeaderService,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformID: string
  ) {}

  ngOnInit() {
    const appIsStable$ = this.appRef.isStable.pipe(first((isStable) => isStable === true))
    const hourly$ = interval(60 * 60 * 1000)

    concat(appIsStable$, hourly$).subscribe(() => environment.production && isPlatformBrowser(this.platformID) && this.swupdate.checkForUpdate())

    this.swupdate.versionUpdates.pipe(filter((evt) => evt.type === 'VERSION_READY')).subscribe(() => {
      this.toastService.createToast('Frissítés elérhető. Kérlek töltsd újra az oldalt!', [
        {
          title: 'Újratöltés',
          callback: () => {
            this.swupdate.activateUpdate().then(() => {
              window.location.reload()
            })
          },
        },
      ])
    })

    this.metaService.addTags([
      { property: 'og:site_name', content: 'Verseghy Ferenc Gimnázium' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://verseghy-gimnazium.net/assets/img.png' },
      { property: 'og:description', content: 'Verseghy Ferenc Gimnázium weboldala' },
    ])
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        globalThis.window.scrollTo(0, 0)
        this.loaded = false
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loaded = true
      }
    })
  }
}
