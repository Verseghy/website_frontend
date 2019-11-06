import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { AuthFacade } from '../state/auth/auth.facade'
import { authKey } from '../state/auth/auth.reducer'
import { filter, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(authKey),
      filter(auth => !auth.loading),
      map(auth => {
        if (auth.uid) {
          switch (state.url) {
            case '/login':
              return this.router.createUrlTree(['/competition']) // TODO(zoltanszepesi): to next page
          }
        } else {
          switch (state.url) {
            case '/competition':
              return this.router.createUrlTree(['/login'])
          }
        }

        return true
      })
    )
  }

  constructor(private store: Store<any>, private authFacade: AuthFacade, private router: Router) {}
}
