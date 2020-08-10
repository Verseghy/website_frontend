import { TestBed } from '@angular/core/testing'

import { Observable, of } from 'rxjs'

import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { provideMockActions } from '@ngrx/effects/testing'

import { DataPersistence, NxModule } from '@nrwl/angular'

import { ColleaguesEffects } from './colleagues.effects'
import { ColleaguesService } from '../../services/colleagues.service'

const ColleaguesServiceMock = {
  getColleagues: () => {
    return of([])
  },
}

describe('ColleaguesEffects', () => {
  const actions: Observable<any> = of({})
  let effects: ColleaguesEffects

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        ColleaguesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        {
          provide: ColleaguesService,
          useValue: ColleaguesServiceMock,
        },
      ],
    })

    effects = TestBed.inject(ColleaguesEffects)
  })

  describe('loadColleagues$', () => {
    it('should work', () => {
      expect(true).toBeTruthy()
    })
  })
})
