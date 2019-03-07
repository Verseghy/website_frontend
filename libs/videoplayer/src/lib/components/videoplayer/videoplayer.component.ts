import { Component, OnInit, Input, ViewChild, ElementRef, Inject, HostListener} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'verseghy-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {

  @Input('src') src: Object
  @Input('color') color: string = 'red'
  @ViewChild('video') video: ElementRef
  videoElement: HTMLVideoElement
  time = 0;
  source = ""
  host: ElementRef
  buffers: TimeRanges = {length: 0, start: () => {return 0}, end: () => {return 0}}
  duration = 0
  paused = true
  fullscreen = false
  qualities: String[]

  constructor(
    private elref: ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit() {
    this._validateSrc()
    this.source = this.src['1080p60']
    this.host = this.elref
    this.videoElement = this.video.nativeElement
    this.qualities = Object.keys(this.src)
  }

  private _validateSrc() {
    if (typeof this.src !== 'object') throw 'Invalid src attribute for VideoplayerComponent'
    if (Object.keys(this.src).length == 0) throw 'Invalid src attribute for VideoplayerComponent'
  }

  onTimeChange(event) {
    this.video.nativeElement.currentTime = this.video.nativeElement.duration * event
  }

  onTimeUpdate(event) {
    this.time = event.target.currentTime / this.video.nativeElement.duration
    this.buffers = this.video.nativeElement.buffered;
  }

  onChangeVolume(event: any) {
    this.video.nativeElement.volume = event
  }

  onQualityChange(quality: string) {
    let isPaused = false;
    if (this.video.nativeElement.paused) isPaused = true;
    const currentTime = this.video.nativeElement.currentTime
    this.video.nativeElement.pause()
    this.source = this.src[quality]
    this.video.nativeElement.load()
    this.video.nativeElement.currentTime = currentTime
    if (!isPaused) this.video.nativeElement.play()
  }

  videoClick() {
    if (this.video.nativeElement.paused) {
      this.video.nativeElement.play()
    } else {
      this.video.nativeElement.pause()
    }
  }

  dblclick() {
    if (this.fullscreen) {
      this.document.exitFullscreen()
    } else {
      this.host.nativeElement.requestFullscreen()
    }
  }

  onLoadedmetadata() {
    this.duration = this.videoElement.duration
  }

  onPlay() {
    this.paused = false
  }

  onPause() {
    this.paused = true
  }

  @HostListener('fullscreenchange')
  onFullscreenchange() {
    this.fullscreen = !this.fullscreen
  }
}