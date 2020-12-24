import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth'
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore'
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './state/auth/auth.effects'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { LandingComponent } from './components/landing/landing.component'

import { MdcButtonModule, MdcTypographyModule, MdcSwitchModule } from '@angular-mdc/web'
import { authKey, reducer as authReducer } from './state/auth/auth.reducer'
import { competitionFeatureKey, reducer as competitionReducer } from './state/competition/competition.reducer'
import { timeFeatureKey, reducer as timeReducer } from './state/time/time.reducer'
import { CompetitionEffects } from './state/competition/competition.effects'
import { TimeEffects } from './state/time/time.effects'
import { FormsModule } from '@angular/forms'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const material = [MdcTypographyModule, MdcButtonModule, MdcSwitchModule]

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(authKey, authReducer),
    StoreModule.forFeature(competitionFeatureKey, competitionReducer),
    StoreModule.forFeature(timeFeatureKey, timeReducer),
    EffectsModule.forRoot([AuthEffects, CompetitionEffects, TimeEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ...material,
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: !environment.production ? ['localhost', 5004] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: !environment.production ? ['localhost', 5002] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: !environment.production ? ['localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
