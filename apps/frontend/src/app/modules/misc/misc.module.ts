import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthorsComponent } from './components/authors/authors.component'
import { RouterModule, Routes } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { ColleaguesComponent } from './components/colleagues/colleagues.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { COLLEAGUES_FEATURE_KEY, colleaguesReducer, initialState as colleaguesInitialState } from './reducer/colleagues/colleagues.reducer'
import { ColleaguesEffects } from './reducer/colleagues/colleagues.effects'
import { InViewportModule } from 'ng-in-viewport'
import { DiakTollViewerModule } from './modules/diaktoll-viewer/diak-toll-viewer.module'

library.add(faGithub, faLinkedin, faFileAlt, faEnvelope)

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
  {
    path: 'colleagues',
    component: ColleaguesComponent,
  },
  {
    path: 'diaktoll',
    loadChildren: () => import('./modules/diaktoll-viewer/diak-toll-viewer.module').then((m) => DiakTollViewerModule),
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    InViewportModule,
    StoreModule.forFeature(COLLEAGUES_FEATURE_KEY, colleaguesReducer, { initialState: colleaguesInitialState }),
    EffectsModule.forFeature([ColleaguesEffects]),
  ],
  declarations: [AuthorsComponent, ColleaguesComponent],
})
export class MiscModule {}
