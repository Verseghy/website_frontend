import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import * as authActions from "./auth.actions";
import { User } from "./auth.reducer";
import { AngularFireAuth } from "@angular/fire/auth";
import { fromPromise } from "rxjs/internal-compatibility";

export type Action = authActions.AuthActions;


@Injectable()
export class AuthEffects {

  @Effect()
  getUser: Observable<Action> = this.actions$.pipe(
    ofType(authActions.GET_USER),
    map((action: authActions.GetUser) => action.payload ),
    switchMap(() => this.afAuth.authState ),
    map(authData => {
      if (authData) {
        const user: User = {
          uid: authData.uid,
        };
        return new authActions.Authenticated(user);
      } else {
        return new authActions.NotAuthenticated();
      }
    }),
    catchError(() =>  of(new authActions.AuthError()) )
  );
  @Effect()
  login: Observable<Action> = this.actions$.pipe(
    ofType(authActions.LOGIN),
    map((action: authActions.Login) => action.payload),
    switchMap(payload => {
      return fromPromise(this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password));
    }),
    map( () => {
      return new authActions.GetUser();
    }),
    catchError(err => {
      return of(new authActions.AuthError({error: err.message}));
    })
  );
D;
  @Effect()
  logout: Observable<Action> = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    switchMap(() => {
      return fromPromise(this.afAuth.auth.signOut());
    }),
    map(() => {
      return new authActions.GetUser();
    }),
    catchError(err => {
      return of(new authActions.AuthError({error: err.message}));
    })
  );

  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth
  ) {}
}
