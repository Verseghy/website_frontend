import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { POPUP_FEATURE_KEY, initialState as popupInitialState, popupReducer } from './+state/popup.reducer'
import { PopupEffects } from './+state/popup.effects'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POPUP_FEATURE_KEY, popupReducer, { initialState: popupInitialState }),
    EffectsModule.forFeature([PopupEffects]),
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
