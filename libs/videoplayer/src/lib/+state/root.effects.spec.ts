import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { NxModule } from '@nrwl/nx'
import { DataPersistence } from '@nrwl/nx'
import { hot } from '@nrwl/nx/testing'

import { RootEffects } from './root.effects'
import { LoadRoot, RootLoaded } from './root.actions'

describe('RootEffects', () => {
  let actions: Observable<any>
  let effects: RootEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [RootEffects, DataPersistence, provideMockActions(() => actions)],
    })

    effects = TestBed.get(RootEffects)
  })

  describe('loadRoot$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadRoot() })
      expect(effects.loadRoot$).toBeObservable(hot('-a-|', { a: new RootLoaded([]) }))
    })
  })
})
