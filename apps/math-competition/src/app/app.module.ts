import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './state/auth/auth.effects'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { LandingComponent } from './components/landing/landing.component'

import { MdcButtonModule, MdcTypographyModule } from '@angular-mdc/web'
import { authKey, reducer } from './state/auth/auth.reducer'

const material = [
  MdcTypographyModule,
  MdcButtonModule
]

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(authKey, reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([AuthEffects]),
    ServiceWorkerModule.register('safety-worker.js', { enabled: environment.production }),
    ...material
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
