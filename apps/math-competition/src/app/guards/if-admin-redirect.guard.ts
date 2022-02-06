import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class IfAdminRedirectGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afa.idTokenResult.pipe(
      map((token) => {
        if (!token) return true
        if (token.claims.admin) {
          return this.router.createUrlTree(['/admin'])
        }

        return true
      })
    )
  }

  constructor(private afa: AngularFireAuth, private router: Router) {}
}
