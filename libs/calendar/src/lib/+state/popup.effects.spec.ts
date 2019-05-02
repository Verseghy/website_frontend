import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { NxModule } from '@nrwl/nx'
import { DataPersistence } from '@nrwl/nx'
import { hot } from '@nrwl/nx/testing'

import { PopupEffects } from './popup.effects'
import { LoadPopup, PopupLoaded } from './popup.actions'

describe('PopupEffects', () => {
  let actions: Observable<any>
  let effects: PopupEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [PopupEffects, DataPersistence, provideMockActions(() => actions)],
    })

    effects = TestBed.get(PopupEffects)
  })

  describe('loadPopup$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadPopup() })
      expect(effects.loadPopup$).toBeObservable(hot('-a-|', { a: new PopupLoaded([]) }))
    })
  })
})
