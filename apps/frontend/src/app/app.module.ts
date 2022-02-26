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
import { LoadersModule } from '@verseghy/ui'
import { environment } from '../environments/environment'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ToastComponent } from './components/toast/toast.component'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { LayoutModule } from '@angular/cdk/layout'
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
import {createPersistedQueryLink} from "apollo-angular/persisted-queries";
import {sha256} from "crypto-hash";

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
    LayoutModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const link = createPersistedQueryLink({
          sha256
        }).concat(
          httpLink.create({uri: environment.gqlURL}),
        );
        return {
          cache: new InMemoryCache(),
          link
        }
      },
      deps: [HttpLink]
    }
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
