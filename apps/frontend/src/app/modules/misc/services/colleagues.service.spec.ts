import { TestBed } from '@angular/core/testing'

import { ColleaguesService } from './colleagues.service'

describe('ColleaguesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ColleaguesService = TestBed.get(ColleaguesService)
    expect(service).toBeTruthy()
  })
})
