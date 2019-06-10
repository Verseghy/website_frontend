import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'

import { PopupPartialState } from './popup.reducer'

@Injectable()
export class PopupEffects {
  constructor(private actions$: Actions) {}
}
