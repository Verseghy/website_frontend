import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SubSink } from 'subsink'
import { AuthFacade } from '../../../../state/auth/auth.facade'

@Component({
  selector: 'verseghy-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginscreenComponent implements OnInit, OnDestroy {
  private subs = new SubSink()

  loginError$ = this.authFacade.loginError$
  loading$ = this.authFacade.loading$

  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  })

  constructor(private fb: FormBuilder, private authFacade: AuthFacade, private router: Router) {}

  ngOnInit() {
    this.subs.sink = this.authFacade.uid$.subscribe((uid) => {
      if (uid) this.router.navigate(['/waiting'])
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onSubmit() {
    if (this.form.valid) {
      this.authFacade.login({ email: this.form.get('email').value, password: this.form.get('password').value })
    }
  }

  localizeLoginError(error) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Ezzel az email címmel még nem történt regisztráció!'
      case 'auth/wrong-password':
        return 'Rossz jelszó!'
      case 'auth/network-request-failed':
        return 'Sikertelen bejelentkezés, kérlek próbáld újra!'
      case 'auth/too-many-requests':
        return 'Túl sok próbálkozás, kérlek próbáld újra később!'

      default:
        return `Ismeretlen hiba történt: ${error.code} ${error.message}!`
    }
  }
}
