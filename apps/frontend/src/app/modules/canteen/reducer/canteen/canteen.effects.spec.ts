import { TestBed } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { DataPersistence, NxModule } from '@nrwl/nx'
import { hot } from '@nrwl/nx/testing'

import { CanteenEffects } from './canteen.effects'
import { CanteenLoaded, LoadCanteen } from './canteen.actions'

describe('CanteenEffects', () => {
  let actions: Observable<any>
  let effects: CanteenEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [CanteenEffects, DataPersistence, provideMockActions(() => actions)],
    })

    effects = TestBed.get(CanteenEffects)
  })

  describe('loadCanteen$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadCanteen() })
      expect(effects.loadCanteen$).toBeObservable(hot('-a-|', { a: new CanteenLoaded([]) }))
    })
  })
})
