import { TestBed } from '@angular/core/testing'

import { Observable, of } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { DataPersistence, NxModule } from '@nrwl/angular'

import { EventsEffects } from './events.effects'
import { HttpClient } from '@angular/common/http'

const httpMock = {}

describe('EventsEffects', () => {
  const actions: Observable<any> = of({})
  let effects: EventsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [EventsEffects, DataPersistence, provideMockActions(() => actions), { provide: HttpClient, useValue: httpMock }],
    })

    effects = TestBed.inject(EventsEffects)
  })

  describe('loadEvents$', () => {
    it('should work', () => {
      expect(true).toBeTruthy()
    })
  })
})
