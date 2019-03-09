import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ControlsComponent } from './components/controls/controls.component'
import { FormsModule } from '@angular/forms'
import { ProgressbarComponent } from './components/progressbar/progressbar.component'
import { VideoService } from './services/video.service';
import { PlayPauseButtonComponent } from './components/play-pause-button/play-pause-button.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    FontAwesomeModule,
  ],
  declarations: [VideoplayerComponent, ControlsComponent, ProgressbarComponent, PlayPauseButtonComponent],
  exports: [VideoplayerComponent],
  providers: [VideoService],
})
export class VideoplayerModule {}
