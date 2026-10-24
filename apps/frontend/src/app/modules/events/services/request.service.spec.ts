import { TestBed } from '@angular/core/testing'

import { RequestService } from './request.service'
import { Apollo } from 'apollo-angular'
import { of } from 'rxjs'

const ApolloMock = {
  query: () => of({ data: { events: [] } }),
}

describe('RequestService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Apollo, useValue: ApolloMock }],
    })
  )

  it('should be created', () => {
    const service: RequestService = TestBed.inject(RequestService)
    expect(service).toBeTruthy()
  })
})
