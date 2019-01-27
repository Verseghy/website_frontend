import { TestBed } from '@angular/core/testing'

import { CanteenService } from './canteen.service'

describe('CanteenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: CanteenService = TestBed.get(CanteenService)
    expect(service).toBeTruthy()
  })
})
