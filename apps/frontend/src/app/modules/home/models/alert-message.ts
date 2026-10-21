/**
 * Shape of a notice shown in the alert strip at the top of the home page.
 *
 * Notices themselves are maintained by hand in `AlertService`; this file only describes their
 * fields and the priority levels that the `AlertComponent` template and stylesheet know how to render.
 */
export enum AlertMessagePriority {
  /** Informational, rendered on a blue background with a plain exclamation icon. */
  LOW = 'low',
  /** Needs attention, rendered on a yellow background with a circled exclamation icon. */
  MEDIUM = 'medium',
  /** Urgent, such as an outage; rendered on a red background with a warning triangle icon. */
  HIGH = 'high',
}

export interface AlertMessage {
  /** Text shown to the visitor as a single paragraph. */
  message: string
  /** Optional URL the whole notice links to. Omit for notices that are purely informational. */
  link?: string
  /** Controls the colour and icon of the notice, see `AlertMessagePriority`. */
  priority: AlertMessagePriority
  /**
   * Instant after which the notice is no longer shown, so time-boxed notices such as maintenance
   * windows retire themselves without a follow-up deployment. Omit for notices with no expiry.
   */
  visibleUntil?: Date
}
