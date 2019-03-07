import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ControlsComponent } from './components/controls/controls.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    FontAwesomeModule
  ],
  declarations: [VideoplayerComponent, ControlsComponent],
  exports: [VideoplayerComponent],
})
export class VideoplayerModule {}
