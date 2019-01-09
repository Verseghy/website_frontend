import { inject, TestBed } from '@angular/core/testing'

import { AuthGuard } from './auth.guard'
import { StoreModule } from '@ngrx/store'
import { RouterModule } from '@angular/router'
import { APP_BASE_HREF } from '@angular/common'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: '/' }],
      imports: [StoreModule.forRoot({}), RouterModule.forRoot([])],
    })
  })

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy()
  }))
})
