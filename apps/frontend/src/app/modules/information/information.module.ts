import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { InformationRoutingModule } from './information-routing.module'
import { InformationComponent } from './components/information/information.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SharedModule } from '../shared/shared.module'
import { StoreModule } from '@ngrx/store'
import * as fromInformation from './state/information/information.reducer'
import { EffectsModule } from '@ngrx/effects'
import { InformationEffects } from './state/information/information.effects'
import { LoadersModule } from '@verseghy/ui'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

@NgModule({
  declarations: [InformationComponent, SidebarComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    LoadersModule,
    SharedModule,
    StoreModule.forFeature(fromInformation.informationFeatureKey, fromInformation.reducer),
    EffectsModule.forFeature([InformationEffects]),
    FontAwesomeModule,
  ],
})
export class InformationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBars)
  }
}
