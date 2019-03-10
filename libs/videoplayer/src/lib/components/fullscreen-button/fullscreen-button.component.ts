import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'verseghy-fullscreen-button',
  templateUrl: './fullscreen-button.component.html',
  styleUrls: ['./fullscreen-button.component.scss']
})
export class FullscreenButtonComponent implements OnInit {

  isFullscreen$: BehaviorSubject<boolean>

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.isFullscreen$ = this.videoService.isFullscreen$
  }

  toggleFullscreen() {
    this.videoService.toggleFullscreen()
  }

}
