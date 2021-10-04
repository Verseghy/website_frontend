import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root',
})
export class IfNotAdminRedirectGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afa.idTokenResult.pipe(
      map((token) => {
        if (!(token && token.claims.admin)) return this.router.createUrlTree(['/login'])

        return true
      })
    )
  }

  constructor(private afa: AngularFireAuth, private router: Router) {}
}
