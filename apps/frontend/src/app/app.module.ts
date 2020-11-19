import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RoutingModule } from './routing.module'
import { HeaderComponent } from './components/header/header.component'
import { HttpClientModule } from '@angular/common/http'
import { FooterComponent } from './components/footer/footer.component'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { FormsModule } from '@angular/forms'
import { NxModule } from '@nrwl/angular'
import { ActionReducer, Store, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { AngularFireModule } from '@angular/fire'
import { LoadersModule } from '@verseghy/ui'
import { environment } from '../environments/environment'
import { ServiceWorkerModule } from '@angular/service-worker'
import { AngularFireAnalyticsModule, APP_NAME, APP_VERSION, COLLECTION_ENABLED, ScreenTrackingService } from '@angular/fire/analytics'
import { AngularFirePerformanceModule } from '@angular/fire/performance'
import { ToastComponent } from './components/toast/toast.component'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const stateSetter = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload
    }
    return reducer(state, action)
  }
}

export const NGRX_STATE = makeStateKey('NGRX_STATE')

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ToastComponent, PageNotFoundComponent],
  imports: [
    BrowserTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    LoadersModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}, { metaReducers: [stateSetter] }),
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
export class AppModule {
  constructor(library: FaIconLibrary, private transferState: TransferState, private store: Store<any>) {
    library.addIcons(faFacebookF)

    const isBrowser = this.transferState.hasKey<any>(NGRX_STATE)

    if (isBrowser) {
      this.onBrowser()
    } else {
      this.onServer()
    }
  }

  onServer() {
    this.transferState.onSerialize(NGRX_STATE, () => {
      let state
      this.store
        .subscribe((saveState: any) => {
          state = saveState
        })
        .unsubscribe()
      return state
    })
  }

  onBrowser() {
    const state = this.transferState.get<any>(NGRX_STATE, null)
    this.transferState.remove(NGRX_STATE)
    this.store.dispatch({ type: 'SET_ROOT_STATE', payload: state })
  }
}
