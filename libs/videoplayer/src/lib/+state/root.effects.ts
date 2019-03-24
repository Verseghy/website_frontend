import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { DataPersistence } from '@nrwl/nx'

import { RootPartialState } from './root.reducer'
import { RootActionTypes } from './root.actions'

@Injectable()
export class RootEffects {
  constructor(private actions$: Actions, private dataPersistence: DataPersistence<RootPartialState>) {}
}
