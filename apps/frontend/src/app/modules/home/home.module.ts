import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from '../shared/shared.module'

import { HomeComponent } from './components/home/home.component'
import { FeaturedPostComponent } from './components/featured-post/featured-post.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AlertComponent } from './components/alert/alert.component'
import { BannersComponent } from './components/banners/banners.component'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faExclamation, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,
  ],
  declarations: [HomeComponent, FeaturedPostComponent, AlertComponent, BannersComponent],
})
export class HomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faExclamation, faExclamationCircle, faExclamationTriangle)
  }
}
