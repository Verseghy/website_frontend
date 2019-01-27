import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { CanteenComponent } from './components/canteen/canteen.component'
import { StoreModule } from '@ngrx/store'
import { CANTEEN_FEATURE_KEY, canteenReducer, initialState as canteenInitialState } from './reducer/canteen/canteen.reducer'
import { EffectsModule } from '@ngrx/effects'
import { CanteenEffects } from './reducer/canteen/canteen.effects'

const routes: Routes = [
  {
    path: '',
    component: CanteenComponent,
  },
]

@NgModule({
  declarations: [CanteenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CANTEEN_FEATURE_KEY, canteenReducer, { initialState: canteenInitialState }),
    EffectsModule.forFeature([CanteenEffects]),
  ],
})
export class CanteenModule {}
