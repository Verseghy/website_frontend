import { TestBed } from '@angular/core/testing'

import { CanteenService } from './canteen.service'
import { of } from 'rxjs'
import { HttpClient } from '@angular/common/http'

const HttpMock = {
  get: () => of([]),
}

describe('CanteenService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpMock,
        },
      ],
    })
  )

  it('should be created', () => {
    const service: CanteenService = TestBed.inject(CanteenService)
    expect(service).toBeTruthy()
  })
})
