import { TestBed, async } from '@angular/core/testing'

import { Observable } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { NxModule } from '@nrwl/nx'
import { DataPersistence } from '@nrwl/nx'
import { hot } from '@nrwl/nx/testing'

import { CellsEffects } from './cells.effects'
import { LoadCells, CellsLoaded } from './cells.actions'

describe('CellsEffects', () => {
  let actions: Observable<any>
  let effects: CellsEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [CellsEffects, DataPersistence, provideMockActions(() => actions)],
    })

    effects = TestBed.get(CellsEffects)
  })

  describe('loadCells$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadCells() })
      expect(effects.loadCells$).toBeObservable(hot('-a-|', { a: new CellsLoaded([]) }))
    })
  })
})
