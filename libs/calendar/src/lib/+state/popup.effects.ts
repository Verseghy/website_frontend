import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { DataPersistence } from '@nrwl/nx'

import { PopupPartialState } from './popup.reducer'

@Injectable()
export class PopupEffects {
  constructor(private actions$: Actions, private dataPersistence: DataPersistence<PopupPartialState>) {}
}
