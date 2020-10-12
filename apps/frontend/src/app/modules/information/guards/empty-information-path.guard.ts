import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { InformationFacade } from '../state/information/information.facade'
import { Observable, of } from 'rxjs'
import { filter, map } from 'rxjs/operators'

@Injectable()
export class EmptyInformationPathGuard implements CanActivate {
  constructor(private informationFacade: InformationFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.informationFacade.queryMenu()
    return this.informationFacade.menu$.pipe(
      map((menu) => {
        const firstSlug = menu.reduce((previousValue, currentValue) => {
          if (!previousValue && currentValue.type === 'page_link') {
            return currentValue.slug
          }
          return previousValue
        }, '')
        if (!firstSlug) return null
        return this.router.createUrlTree(['/information', firstSlug])
      }),
      filter((value) => !!value)
    )
  }
}
