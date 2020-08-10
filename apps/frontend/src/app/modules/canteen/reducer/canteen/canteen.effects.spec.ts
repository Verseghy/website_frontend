import { TestBed } from '@angular/core/testing'

import { Observable, of } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { DataPersistence, NxModule } from '@nrwl/angular'

import { CanteenEffects } from './canteen.effects'
import { CanteenService } from '../../services/canteen.service'

const CanteenServiceMock = {
  getCanteen: () => of([], []),
}

describe('CanteenEffects', () => {
  const actions: Observable<any> = of({})
  let effects: CanteenEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        CanteenEffects,
        DataPersistence,
        provideMockActions(() => actions),
        {
          provide: CanteenService,
          useValue: CanteenServiceMock,
        },
      ],
    })

    effects = TestBed.inject(CanteenEffects)
  })

  describe('loadCanteen$', () => {
    it('should work', () => {
      expect(true).toBeTruthy()
    })
  })
})
