import { inject, TestBed } from '@angular/core/testing'

import { TimeGuard } from './time.guard'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common'

describe('TimeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimeGuard,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        StoreModule.forRoot({}),
        RouterModule.forRoot([]),
      ]
    })
  })

  it('should create', inject([TimeGuard], (guard: TimeGuard) => {
    expect(guard).toBeTruthy()
  }))
})
