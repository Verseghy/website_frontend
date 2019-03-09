import { Component } from '@angular/core'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'videoplayer-demo'
  src = {
    '4k60': 'https://storage.googleapis.com/videoplayer-demo/2160p60.mp4',
    '4k30': 'https://storage.googleapis.com/videoplayer-demo/2160p30.mp4',
    '1080p60': 'https://storage.googleapis.com/videoplayer-demo/1080p60.mp4',
    '1080p30': 'https://storage.googleapis.com/videoplayer-demo/1080p30.mp4',
    '480p': 'https://storage.googleapis.com/videoplayer-demo/480p.mp4',
    '360p': 'https://storage.googleapis.com/videoplayer-demo/360p.mp4',
  }
}
