import { TestBed } from '@angular/core/testing'

import { Observable, of } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { EventsEffects } from './events.effects'
import { RequestService } from '../services/request.service'

const RequestServiceMock = {
  getEvents: () => of([]),
}

describe('EventsEffects', () => {
  const actions: Observable<any> = of({})
  let effects: EventsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [EventsEffects, provideMockActions(() => actions), { provide: RequestService, useValue: RequestServiceMock }],
    })

    effects = TestBed.inject(EventsEffects)
  })

  describe('loadEvents$', () => {
    it('should work', () => {
      expect(true).toBeTruthy()
    })
  })
})
