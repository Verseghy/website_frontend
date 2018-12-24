import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore'
import { select, Store } from '@ngrx/store'
import * as authActions from '../../../../reducers/auth/auth.actions'
import { filter, map, tap } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'verseghy-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss'],
})
export class LoginscreenComponent implements OnInit, OnDestroy {
  error: Observable<string>

  loginForm = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [Validators.required]),
    password: new FormControl({ value: '', disabled: false }, [Validators.required]),
  })

  subs: Array<Subscription> = []

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private router: Router, private store: Store<any>) {}

  ngOnInit() {
    this.error = this.store.pipe(
      select('auth'),
      filter(data => !data.loading && data.error),
      map(data => {
        return data.error
      })
    )

    this.subs.push(
      this.store
        .pipe(
          select('auth'),
          filter(data => data),
          filter(data => !data.loading),
          filter(data => data.uid),
          tap(() => {
            // @ts-ignore
            window.location = '/competition' // TODO: Pls fix this
          })
        )
        .subscribe()
    )
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe()
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        new authActions.Login({
          email: this.loginForm.controls['username'].value,
          password: this.loginForm.controls['password'].value,
        })
      )
      this.loginForm.reset()
    }
  }
}
