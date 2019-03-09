import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'verseghy-play-pause-button',
  templateUrl: './play-pause-button.component.html',
  styleUrls: ['./play-pause-button.component.scss']
})
export class PlayPauseButtonComponent implements OnInit {
  buttonVisible$: BehaviorSubject<boolean> // true = play   false = pause

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.buttonVisible$ = this.videoService.paused$
  }

  playVideo() {
    this.videoService.video.play()
  }

  pauseVideo() {
    this.videoService.video.pause()
  }

}
