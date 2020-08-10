import { TestBed } from '@angular/core/testing'

import { ColleaguesService } from './colleagues.service'
import { of } from 'rxjs'
import { HttpClient } from '@angular/common/http'

const HttpMock = {
  get: () => of([]),
}

describe('ColleaguesService', () => {
  beforeEach(() => {
    return TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: HttpMock,
        },
      ],
    })
  })

  it('should be created', () => {
    const service: ColleaguesService = TestBed.inject(ColleaguesService)
    expect(service).toBeTruthy()
  })
})
