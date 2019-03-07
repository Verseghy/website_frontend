import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { NxModule } from '@nrwl/nx'
import { RouterModule } from '@angular/router'
import { VideoplayerModule } from '@verseghy/videoplayer';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NxModule.forRoot(), RouterModule.forRoot([], { initialNavigation: 'enabled' }), VideoplayerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
