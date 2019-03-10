import { Injectable, Inject } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Buffer } from '../videoplayer.interface'
import { DOCUMENT } from '@angular/common';

@Injectable()
export class VideoService {
  time$: BehaviorSubject<number> = new BehaviorSubject(0)
  color = 'red'
  buffers$: BehaviorSubject<Buffer[]> = new BehaviorSubject([])
  duration$: Subject<number> = new Subject()
  video: HTMLVideoElement
  paused$: BehaviorSubject<boolean> = new BehaviorSubject(true)
  host: any
  isFullscreen$: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(@Inject(DOCUMENT) private document: any) {}

  toggleFullscreen() {
    if (this.isFullscreen()) {
      this.document.exitFullscreen()
    } else {
      this.host.requestFullscreen()
    }
  }

  isFullscreen() {
    return this.document.fullscreenElement == this.host
  }
}
