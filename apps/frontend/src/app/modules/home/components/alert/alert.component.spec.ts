import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faExclamation, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { of } from 'rxjs'

import { AlertComponent } from './alert.component'
import { AlertService } from '../../services/alert.service'
import { AlertMessage, AlertMessagePriority } from '../../models/alert-message'

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>
  let messages: AlertMessage[]

  const alertServiceStub = {
    getAlertMessages: () => of(messages),
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [AlertComponent],
      providers: [{ provide: AlertService, useValue: alertServiceStub }],
    }).compileComponents()
  }))

  beforeEach(() => {
    // Mirrors the registration in HomeModule; without it fa-icon has nothing to draw.
    TestBed.inject(FaIconLibrary).addIcons(faExclamation, faExclamationCircle, faExclamationTriangle)
  })

  function render(withMessages: AlertMessage[]): HTMLElement {
    messages = withMessages
    fixture = TestBed.createComponent(AlertComponent)
    fixture.detectChanges()
    return fixture.nativeElement
  }

  it('renders nothing when there are no notices', () => {
    expect(render([]).querySelectorAll('a').length).toBe(0)
  })

  it('renders a high priority notice with the red style and warning icon', () => {
    const notice = render([{ message: 'Karbantartás', priority: AlertMessagePriority.HIGH }]).querySelector('a')
    expect(notice.classList).toContain('high')
    expect(notice.querySelector('p').textContent).toBe('Karbantartás')
    expect(notice.querySelector('fa-icon.icon-high svg')).not.toBeNull()
    expect(notice.querySelector('fa-icon.icon-low')).toBeNull()
    expect(notice.querySelector('fa-icon.icon-medium')).toBeNull()
  })

  it('leaves the notice unlinked when no link is given', () => {
    expect(
      render([{ message: 'Info', priority: AlertMessagePriority.LOW }])
        .querySelector('a')
        .getAttribute('href')
    ).toBeNull()
  })

  it('links the notice when a link is given', () => {
    const notice = render([{ message: 'Info', priority: AlertMessagePriority.LOW, link: 'https://example.com/' }]).querySelector('a')
    expect(notice.getAttribute('href')).toBe('https://example.com/')
  })

  it('renders one row per notice in order', () => {
    const rows = render([
      { message: 'first', priority: AlertMessagePriority.HIGH },
      { message: 'second', priority: AlertMessagePriority.MEDIUM },
    ]).querySelectorAll('a')
    expect(rows.length).toBe(2)
    expect(rows[0].classList).toContain('high')
    expect(rows[1].classList).toContain('medium')
  })
})
