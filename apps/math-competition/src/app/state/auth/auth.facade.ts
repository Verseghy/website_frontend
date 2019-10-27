import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { initAuth, login, logout } from './auth.actions'
import { selectLoading, selectLoginError } from './auth.selectors'

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  loginError$ = this.store$.pipe(select(selectLoginError))
  loading$ = this.store$.pipe(select(selectLoading))

  init() {
    this.store$.dispatch(initAuth())
  }

  login({ email, password }: { email: string; password: string }) {
    this.store$.dispatch(login({ email, password }))
  }

  constructor(private store$: Store<any>) {}

  logout() {
    this.store$.dispatch(logout())
  }
}
