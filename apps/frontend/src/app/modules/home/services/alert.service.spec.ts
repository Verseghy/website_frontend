import { TestBed } from '@angular/core/testing'

import { AlertService, selectActiveAlertMessages } from './alert.service'
import { AlertMessage, AlertMessagePriority } from '../models/alert-message'

describe('selectActiveAlertMessages', () => {
  const now = new Date('2026-10-21T12:00:00+02:00')
  const permanent: AlertMessage = { message: 'permanent', priority: AlertMessagePriority.LOW }
  const future: AlertMessage = {
    message: 'future',
    priority: AlertMessagePriority.HIGH,
    visibleUntil: new Date('2026-10-22T06:00:00+02:00'),
  }
  const expired: AlertMessage = {
    message: 'expired',
    priority: AlertMessagePriority.MEDIUM,
    visibleUntil: new Date('2026-10-20T06:00:00+02:00'),
  }

  it('keeps notices without an expiry', () => {
    expect(selectActiveAlertMessages([permanent], now)).toEqual([permanent])
  })

  it('keeps notices whose expiry is still ahead', () => {
    expect(selectActiveAlertMessages([future], now)).toEqual([future])
  })

  it('drops notices whose expiry has passed', () => {
    expect(selectActiveAlertMessages([expired], now)).toEqual([])
  })

  it('drops a notice exactly at its expiry', () => {
    expect(selectActiveAlertMessages([future], new Date(future.visibleUntil))).toEqual([])
  })

  it('preserves the original order of the remaining notices', () => {
    expect(selectActiveAlertMessages([future, expired, permanent], now)).toEqual([future, permanent])
  })

  it('rejects an invalid expiry date with a clear error', () => {
    const broken: AlertMessage = { message: 'typo', priority: AlertMessagePriority.LOW, visibleUntil: new Date('2026-13-45') }
    expect(() => selectActiveAlertMessages([broken], now)).toThrowError(/notice "typo" has an invalid visibleUntil date/)
  })

  it('rejects an invalid "now" with a clear error', () => {
    expect(() => selectActiveAlertMessages([permanent], new Date('not a date'))).toThrowError(/"now" must be a valid Date/)
  })
})

describe('AlertService', () => {
  let service: AlertService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AlertService)
  })

  function messagesAt(now?: Date): AlertMessage[] {
    let result: AlertMessage[]
    service.getAlertMessages(now).subscribe((messages) => (result = messages))
    return result
  }

  it('shows the maintenance notice in red before the maintenance window ends', () => {
    const messages = messagesAt(new Date('2026-10-21T13:00:00+02:00'))
    expect(messages.length).toBe(1)
    expect(messages[0].priority).toBe(AlertMessagePriority.HIGH)
    expect(messages[0].message).toContain('2026. október 21-én 14:00')
    expect(messages[0].message).toContain('2026. október 22-én 06:00')
  })

  it('still shows the maintenance notice during the window', () => {
    expect(messagesAt(new Date('2026-10-22T05:59:59+02:00')).length).toBe(1)
  })

  it('retires the maintenance notice once the window has ended', () => {
    expect(messagesAt(new Date('2026-10-22T06:00:00+02:00'))).toEqual([])
  })

  it('evaluates expiry against the current time by default', () => {
    jasmine.clock().install()
    try {
      jasmine.clock().mockDate(new Date('2026-10-21T13:00:00+02:00'))
      expect(messagesAt().length).toBe(1)
      jasmine.clock().mockDate(new Date('2026-11-01T00:00:00+01:00'))
      expect(messagesAt()).toEqual([])
    } finally {
      jasmine.clock().uninstall()
    }
  })
})
