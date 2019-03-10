import { Component, OnInit, Input, ViewChild, ElementRef, Inject, HostListener } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { VideoService } from '../../services/video.service'
import { Buffer } from '../../videoplayer.interface'

@Component({
  selector: 'verseghy-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss'],
})
export class VideoplayerComponent implements OnInit {
  @Input() src: Object
  @Input() color = 'red'
  @Input() autoplay = false
  @ViewChild('video') video: ElementRef
  videoElement: HTMLVideoElement
  time = 0
  source = ''
  host: ElementRef
  duration = 0
  paused = true
  qualities: String[]

  constructor(private elref: ElementRef, @Inject(DOCUMENT) private document: any, private videoService: VideoService) {}

  ngOnInit() {
    this._validateSrc()
    this.source = this.src['1080p60']
    this.host = this.elref
    this.videoElement = this.video.nativeElement
    this.qualities = Object.keys(this.src)
    this.video.nativeElement.volume = 0.5
    this.video.nativeElement.autoplay = this.autoplay
    this.videoService.color = this.color
    this.videoService.video = this.videoElement
    this.videoService.host = this.host.nativeElement
  }

  private _validateSrc() {
    if (typeof this.src !== 'object') throw new Error('Invalid src attribute')
    if (Object.keys(this.src).length === 0) throw new Error('Invalid src attribute')
  }

  onTimeUpdate(event) {
    this.videoService.time$.next(event.target.currentTime)

    this.time = event.target.currentTime / this.video.nativeElement.duration

    const buffered = this.video.nativeElement.buffered
    let buffersArray = []
    for (let i = 0; i < buffered.length; i++) {
      const left = (buffered.start(i) / this.duration) * 100
      const width = ((buffered.end(i) - buffered.start(i)) / this.duration) * 100
      const array: Buffer = { left: left, width: width }
      buffersArray = [...buffersArray, array]
    }
    this.videoService.buffers$.next(buffersArray)
  }

  onQualityChange(quality: string) {
    let isPaused = false
    if (this.video.nativeElement.paused) isPaused = true
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
    this.videoService.toggleFullscreen()
  }

  onLoadedmetadata() {
    this.duration = this.videoElement.duration
    this.videoService.duration$.next(this.videoElement.duration)
  }

  onPlay() {
    this.paused = false
    this.videoService.paused$.next(false)
  }

  onPause() {
    this.paused = true
    this.videoService.paused$.next(true)
  }

  @HostListener('fullscreenchange')
  onFullscreenchange() {
    this.videoService.isFullscreen$.next(this.videoService.isFullscreen())
  }
}
