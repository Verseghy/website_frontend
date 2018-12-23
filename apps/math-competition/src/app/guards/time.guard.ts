import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import { filter, map, switchMap } from "rxjs/operators";
import * as timeActions from "../reducers/time/time.actions";
import { TimeState } from "../reducers/time/time.reducer";

@Injectable({
  providedIn: 'root'
})
export class TimeGuard implements CanActivate {

  constructor (
    private store: Store<any>,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    this.store.dispatch(new timeActions.Query());

    return this.store.pipe(
      select('time'),
      filter(data => !data.loading),
      map(() => {
        return this.store.pipe(
          select('time'),
          map(data => {
            switch (state.url) {
              case '/login':
                switch (data.timestate) {
                  case TimeState.BEFORE:
                    this.router.navigate(['/home']);
                    return false;

                  case TimeState.DURING:
                    return true;

                  case TimeState.AFTER:
                    this.router.navigate(['/after']);
                    return false;
                }
                break;

              case '/home':
                switch (data.timestate) {
                  case TimeState.BEFORE:
                    return true;

                  case TimeState.DURING:
                    this.router.navigate(['/login']);
                    return false;

                  case TimeState.AFTER:
                    this.router.navigate(['/after']);
                    return false;
                }
                break;

              case '/competition':
                switch (data.timestate) {
                  case TimeState.BEFORE:
                    this.router.navigate(['/home']);
                    return false;

                  case TimeState.DURING:
                    return true;

                  case TimeState.AFTER:
                    this.router.navigate(['/after']);
                    return false;
                }
                break;

              case '/after':
                switch (data.timestate) {
                  case TimeState.BEFORE:
                    this.router.navigate(['/home']);
                    return false;

                  case TimeState.DURING:
                    this.router.navigate(['/login']);
                    return false;

                  case TimeState.AFTER:
                    return true;
                }
                break;
            }
          })
        );
      }),
      switchMap(data => data)
    );
  }
}
