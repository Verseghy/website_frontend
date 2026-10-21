import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AlertMessage, AlertMessagePriority } from '../models/alert-message'

/**
 * Notices currently published on the home page, in display order.
 *
 * The list lives in code on purpose: the Firebase feed that originally backed it was dropped in the
 * GraphQL migration and the GraphQL backend has no replacement, so editing this array and deploying
 * is how a notice is published or retired. Time-boxed notices should set `visibleUntil` so they
 * disappear on their own once they are stale instead of waiting for someone to remember them.
 */
const ALERT_MESSAGES: readonly AlertMessage[] = [
  {
    message:
      'Tisztelt Látogatóink! Rendkívüli karbantartás miatt honlapunk 2026. október 21-én 14:00 órától előreláthatólag ' +
      '2026. október 22-én 06:00 óráig nem lesz elérhető. Az esetleges kellemetlenségekért szíves elnézésüket kérjük.',
    priority: AlertMessagePriority.HIGH,
    // The UTC offset is spelled out (Budapest is on CEST, UTC+2, in October) so the cutoff is the
    // same whether the page is rendered on the server or in a visitor's browser in another timezone.
    visibleUntil: new Date('2026-10-22T06:00:00+02:00'),
  },
]

/**
 * Returns the notices that should still be shown at a given instant, preserving their order.
 *
 * @param messages Candidate notices. A notice with an invalid `visibleUntil` date is rejected with an
 *   error rather than silently hidden, so a typo in the date is caught by the service's unit tests.
 * @param now The instant to evaluate expiry against. A notice whose `visibleUntil` is at or before
 *   `now` is dropped; notices without `visibleUntil` are always kept.
 */
export function selectActiveAlertMessages(messages: readonly AlertMessage[], now: Date): AlertMessage[] {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new Error('selectActiveAlertMessages: "now" must be a valid Date')
  }

  return messages.filter((message) => {
    if (message.visibleUntil === undefined) return true
    if (!(message.visibleUntil instanceof Date) || Number.isNaN(message.visibleUntil.getTime())) {
      throw new Error(`selectActiveAlertMessages: notice "${message.message}" has an invalid visibleUntil date`)
    }
    return message.visibleUntil.getTime() > now.getTime()
  })
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Emits the notices to show on the home page, already filtered for expiry.
   *
   * @param now The instant to evaluate expiry against. Defaults to the current time; tests pass a
   *   fixed date so their outcome does not depend on when they run.
   */
  getAlertMessages(now: Date = new Date()): Observable<AlertMessage[]> {
    return of(selectActiveAlertMessages(ALERT_MESSAGES, now))
  }
}
