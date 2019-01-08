import { async, TestBed } from '@angular/core/testing'
import { CalendarModule } from './calendar.module'

describe('CalendarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CalendarModule],
    }).compileComponents()
  }))

  it('should create', () => {
    expect(CalendarModule).toBeDefined()
  })
})