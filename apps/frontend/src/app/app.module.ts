import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RoutingModule } from './routing.module'
import { HeaderComponent } from './components/header/header.component'
import { HttpClientModule } from '@angular/common/http'
import { FooterComponent } from './components/footer/footer.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FormsModule } from '@angular/forms'
import { NxModule } from '@nrwl/angular'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AngularFireModule } from '@angular/fire'
import { LoadersModule } from '@verseghy/ui'
import { environment } from '../environments/environment'
import { ServiceWorkerModule } from '@angular/service-worker'
import { AngularFireAnalyticsModule, APP_NAME, APP_VERSION, COLLECTION_ENABLED, ScreenTrackingService } from '@angular/fire/analytics'
import { AngularFirePerformanceModule } from '@angular/fire/performance'
import { CardComponent } from './components/card/card.component'

library.add(faCheck)

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, CardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    LoadersModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ScreenTrackingService,
    { provide: APP_NAME, useValue: 'Verseghy Honlap' },
    { provide: APP_VERSION, useValue: environment.version },
    { provide: COLLECTION_ENABLED, useValue: environment.production },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
