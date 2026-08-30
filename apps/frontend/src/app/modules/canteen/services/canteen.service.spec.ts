import { TestBed } from '@angular/core/testing'

import { CanteenService } from './canteen.service'
import { of } from 'rxjs'
import { Apollo } from 'apollo-angular'

const ApolloMock = {
  query: () => of({ data: { w1: [], w2: [] } }),
}

describe('CanteenService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Apollo,
          useValue: ApolloMock,
        },
      ],
    })
  )

  it('should be created', () => {
    const service: CanteenService = TestBed.inject(CanteenService)
    expect(service).toBeTruthy()
  })
})
