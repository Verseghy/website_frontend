import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarComponent } from './calendar.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { POPUP_FEATURE_KEY, initialState as popupInitialState, popupReducer } from './+state/popup.reducer'
import { PopupEffects } from './+state/popup.effects'
import { CELLS_FEATURE_KEY, initialState as cellsInitialState, cellsReducer } from './+state/cells.reducer'
import { CellsEffects } from './+state/cells.effects'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(POPUP_FEATURE_KEY, popupReducer, { initialState: popupInitialState }),
    EffectsModule.forFeature([PopupEffects]),
    StoreModule.forFeature(CELLS_FEATURE_KEY, cellsReducer, { initialState: cellsInitialState }),
    EffectsModule.forFeature([CellsEffects]),
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
})
export class CalendarModule {}
