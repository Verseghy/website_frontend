import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  buttonTextVisible = true
  spinnerVisible = false
  checkMarkVisible = false
  email: string
  subscribeButtonDisabled = false
  subscribeButtonDone = false

  constructor() {}

  ngOnInit() {}

  devClickHandler() {
    caches
      .keys()
      .then(a => Promise.all(a.map(n => caches.delete(n))))
      .then(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(async registrations => {
            for (const registration of registrations) {
              console.log('serviceWorker unregistered')
              await registration.unregister()
            }
            location.reload()
          })
        }
      })
  }

  subscribeToNewsletter() {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.spinnerVisible = true
      this.buttonTextVisible = false
      this.subscribeButtonDisabled = true
      console.log(this.email)
      this.email = ''
      setTimeout(() => this._subscribeConfirmed(), 3000)
    } else {
      alert('Hibás email-cím!')
    }
  }

  private _subscribeConfirmed() {
    this.spinnerVisible = false
    this.subscribeButtonDone = true
    this.checkMarkVisible = true
  }
}
