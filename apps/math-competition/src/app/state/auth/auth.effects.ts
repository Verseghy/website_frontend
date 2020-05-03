import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'
import { authenticated, initAuth, login, loginError, logout, noop, notAuthenticated } from './auth.actions'
import { from, of } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      exhaustMap(() => this.afAuth.authState),
      map(x => {
        if (x) {
          return authenticated({ uid: x.uid })
        } else {
          return notAuthenticated()
        }
      })
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
          map(() => {
            this.router.navigate(['/waiting'])
            return noop()
          }),
          catchError(error => of(loginError({ error })))
        )
      )
    )
  )

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        exhaustMap(() => {
          return from(this.afAuth.signOut())
        }),
        tap(() => {
          return this.router.navigate(['/login'])
        })
      ),
    { dispatch: false }
  )
  /**
  @Effect()
  login: Observable<Action> = this.actions$.pipe(
    ofType(authActions.LOGIN),
    map((action: authActions.Login) => action.payload),
    switchMap(payload => {
      return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password))
    }),
    map(() => {
      return new authActions.GetUser()
    }),
    catchError(err => {
      return of(new authActions.AuthError({ error: err.message }))
    })
  )
  D
  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    switchMap(() => {
      return fromPromise(this.afAuth.auth.signOut())
    }),
    map(() => {
      return new authActions.GetUser()
    }),
    catchError(err => {
      return of(new authActions.AuthError({ error: err.message }))
    })
  )*/

  constructor(private actions$: Actions, private afAuth: AngularFireAuth, private router: Router) {}
}
