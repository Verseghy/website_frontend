import { TestBed } from '@angular/core/testing'

import { ColleaguesService } from './colleagues.service'
import { of } from 'rxjs'
import { Apollo } from 'apollo-angular'

const ApolloMock = {
  query: () => of({ data: { colleagues: [] } }),
}

describe('ColleaguesService', () => {
  beforeEach(() => {
    return TestBed.configureTestingModule({
      providers: [
        {
          provide: Apollo,
          useValue: ApolloMock,
        },
      ],
    })
  })

  it('should be created', () => {
    const service: ColleaguesService = TestBed.inject(ColleaguesService)
    expect(service).toBeTruthy()
  })
})
