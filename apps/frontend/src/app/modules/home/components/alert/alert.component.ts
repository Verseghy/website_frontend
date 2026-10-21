import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AlertService } from '../../services/alert.service'
import { AlertMessage } from '../../models/alert-message'
import { Observable } from 'rxjs'

/**
 * Strip of notices at the top of the home page, one row per `AlertMessage`.
 *
 * The component is presentation only: which notices exist and whether they are still current is
 * decided by `AlertService`, so publishing or retiring a notice never requires touching the template.
 */
@Component({
  selector: 'verseghy-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  alertMessages$: Observable<AlertMessage[]> = this.alertService.getAlertMessages()

  constructor(private alertService: AlertService) {}
}
