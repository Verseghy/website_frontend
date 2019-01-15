import { TestBed } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { DataPersistence, NxModule } from '@nrwl/nx'
import { hot } from '@nrwl/nx/testing'

import { EventsEffects } from './events.effects'
import { EventsLoaded, LoadEvents } from './events.actions'

describe('EventsEffects', () => {
  let actions: Observable<any>
  let effects: EventsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [EventsEffects, DataPersistence, provideMockActions(() => actions)],
    })

    effects = TestBed.get(EventsEffects)
  })

  describe('loadEvents$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadEvents() })
      expect(effects.loadEvents$).toBeObservable(hot('-a-|', { a: new EventsLoaded([]) }))
    })
  })
})
