import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { AuthFacade } from '../state/auth/auth.facade'
import { filter, map } from 'rxjs/operators'
import { State, timeFeatureKey } from '../state/time/time.reducer'

@Injectable({
  providedIn: 'root',
})
export class TimeGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(timeFeatureKey),
      filter((time: State) => time.loaded),
      map(time => {
        switch (state.url) {
          case '/competition':
            if (new Date() > time.startTime && new Date() < time.endTime) {
              return true
            }
            return this.router.createUrlTree(['/'])

          case '/waiting':
            if (new Date() > time.startTime) {
              return this.router.createUrlTree(['competition'])
            }
            return true
        }

        return true
      })
    )
  }

  constructor(private store: Store<any>, private authFacade: AuthFacade, private router: Router) {}
}
