import { ChangeDetectionStrategy, Component } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'verseghy-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor() {}

  get appVersion() {
    return environment.version
  }

  devClickHandler() {
    caches
      .keys()
      .then((a) => Promise.all(a.map((n) => caches.delete(n))))
      .then(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(async (registrations) => {
            for (const registration of registrations) {
              console.log('serviceWorker unregistered')
              await registration.unregister()
            }
            location.reload()
          })
        }
      })
  }
}
