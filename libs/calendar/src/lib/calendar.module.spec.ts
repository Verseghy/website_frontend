import { TestBed, waitForAsync } from '@angular/core/testing'
import { CalendarModule } from './calendar.module'

describe('CalendarModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CalendarModule],
      }).compileComponents()
    })
  )

  it('should create', () => {
    expect(CalendarModule).toBeDefined()
  })
})
