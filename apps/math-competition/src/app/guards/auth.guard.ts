import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { filter, map } from 'rxjs/operators'
import * as authActions from '../reducers/auth/auth.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new authActions.GetUser())

    return this.store.pipe(
      select('auth'),
      filter(data => !data.loading),
      map(data => {
        switch (state.url) {
          case '/login':
            if (data.uid) {
              this.router.navigate(['/competition'])
              return false
            } else {
              return true
            }

          case '/competition':
            if (data.uid) {
              return true
            } else {
              this.router.navigate(['/login'])
              return false
            }
        }
      })
    )
  }
}
