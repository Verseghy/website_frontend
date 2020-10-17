import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  useBigHeader$ = new BehaviorSubject('undefined')

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(({ url }: NavigationEnd) => (url === '/' ? 'true' : 'false'))
      )
      .subscribe(this.useBigHeader$)
  }
}
