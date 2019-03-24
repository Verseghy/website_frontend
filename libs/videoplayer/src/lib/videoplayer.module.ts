import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ControlsComponent } from './components/controls/controls.component'
import { FormsModule } from '@angular/forms'
import { ProgressbarComponent } from './components/progressbar/progressbar.component'
import { VideoService } from './services/video.service'
import { PlayPauseButtonComponent } from './components/play-pause-button/play-pause-button.component'
import { FullscreenButtonComponent } from './components/fullscreen-button/fullscreen-button.component'
import { VolumeComponent } from './components/volume/volume.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { initialState as rootInitialState, rootReducer } from './+state/root.reducer'
import { RootEffects } from './+state/root.effects'
import { NxModule } from '@nrwl/nx'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreRouterConnectingModule } from '@ngrx/router-store'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    FontAwesomeModule,
    NxModule.forRoot(),
    StoreModule.forRoot(
      { root: rootReducer },
      {
        initialState: { root: rootInitialState }
      }
    ),
    EffectsModule.forRoot([RootEffects]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule,
  ],
  declarations: [
    VideoplayerComponent,
    ControlsComponent,
    ProgressbarComponent,
    PlayPauseButtonComponent,
    FullscreenButtonComponent,
    VolumeComponent,
  ],
  exports: [VideoplayerComponent],
  providers: [VideoService],
})
export class VideoplayerModule {}
