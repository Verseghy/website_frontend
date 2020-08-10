import { TestBed } from '@angular/core/testing'

import { RequestService } from './request.service'
import { HttpClient } from '@angular/common/http'

const httpClientMock = {}

describe('RequestService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    })
  )

  it('should be created', () => {
    const service: RequestService = TestBed.inject(RequestService)
    expect(service).toBeTruthy()
  })
})
