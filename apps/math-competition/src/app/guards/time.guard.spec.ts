import { inject, TestBed } from '@angular/core/testing'

import { TimeGuard } from './time.guard'

describe('TimeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeGuard],
    })
  })

  it('should ...', inject([TimeGuard], (guard: TimeGuard) => {
    expect(guard).toBeTruthy()
  }))
})
