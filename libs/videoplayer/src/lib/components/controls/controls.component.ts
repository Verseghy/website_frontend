import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, OnChanges, Inject, HostListener, HostBinding } from '@angular/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPause, faPlay, faVolumeDown, faVolumeMute, faExpand, faCompress, faCog, faCheck } from '@fortawesome/free-solid-svg-icons'
import { DOCUMENT } from '@angular/common'
import { Buffer } from '../../videoplayer.interface'

@Component({
  selector: 'verseghy-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit, OnChanges {

  @Output('onChangeTime') onChangeTime: EventEmitter<number> = new EventEmitter()
  @Output('onChangeVolume') onChangeVolume: EventEmitter<number> = new EventEmitter()
  @Output('onQualityChange') onQualityChange: EventEmitter<string> = new EventEmitter()
  @Input('host') host: ElementRef
  @Input('qualities') qualities: String[]
  @Input('buffers') buffers: TimeRanges
  @Input('video') video: HTMLVideoElement
  @Input('duration') duration: number
  @Input('paused') paused: boolean
  @Input('fullscreen') isFullscreen: boolean
  @Input('color') color: boolean
  @ViewChild('settingsMenu') settingsMenuElement: ElementRef
  @ViewChild('settingsButton') settingsButton: ElementRef
  timeLeft: string
  muteVolume: number
  keys: string[]
  buffersArray: Buffer[]
  activeQuality = '1080p60'
  @HostBinding('class.settingsMenuOpen') settingsMenu = false

  pauseButtonVisible = true
  playButtonVisible = false
  fullscreenButtonVisible = true
  exitFullscreenButtonVisible = false
  volumeButtonVisible = true
  muteButtonVisible = false
  progressBarWidth = 0
  volumeBarWidth = 50
  @Input('time') progressSliderValue: number
  volumeSliderValue: number


  constructor(@Inject(DOCUMENT) private document: Document) {
    library.add(faPause, faPlay, faVolumeDown, faVolumeMute, faExpand, faCompress, faCog, faCheck)
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    if ('progressSliderValue' in changes) {
      const percentage = 100 * this.progressSliderValue
      this.progressBarWidth = percentage
      if (this.progressSliderValue == 1) this.video.pause()
      this.timeLeft = this._formatTime(Math.round(this.duration - this.video.currentTime))
    }

    if ('buffers' in changes) {
      this._createBuffers()
    }

    if ('paused' in changes) {
      if (this.paused) {
        this.pauseButtonVisible = false
        this.playButtonVisible = true
      } else {
        this.pauseButtonVisible = true
        this.playButtonVisible = false
      }
    }

    if ('isFullscreen' in changes) {
      if (this.isFullscreen) {
        this.fullscreenButtonVisible = false
        this.exitFullscreenButtonVisible = true
      } else {
        this.fullscreenButtonVisible = true
        this.exitFullscreenButtonVisible = false
      }
    }
  }

  changeProgress(event: any) {
    this.onChangeTime.emit(this.progressSliderValue)
    const percentage = 100 * this.progressSliderValue
    this.progressBarWidth = percentage
  }

  playVideo() {
    this.video.play()
  }

  pauseVideo() {
    this.video.pause()
  }

  changeVolume(event: any) {
    this._volumeChange()
  }

  toggleFullscreen() {
    if (this.isFullscreen) {
      this.document.exitFullscreen()
    } else {
      this.host.nativeElement.requestFullscreen()
    }
  }

  private _volumeChange() {
    this.onChangeVolume.emit(this.volumeSliderValue);
    if (this.volumeSliderValue == 0) {
      this.volumeButtonVisible = false
      this.muteButtonVisible = true
    } else {
      this.volumeButtonVisible = true
      this.muteButtonVisible = false
    }
    const percentage = 100 * this.volumeSliderValue;

    this.volumeBarWidth = percentage
  }

  mute() {
    this.muteVolume = this.volumeSliderValue
    this.volumeSliderValue = 0
    this._volumeChange()
  }

  unmute() {
    this.volumeSliderValue = this.muteVolume
    this._volumeChange()
  }

  private _formatTime(time: number): string {
    const hours   = Math.floor(time / 3.6e3) % 60
    const minutes = Math.floor(time / 60) % 60
    const seconds = time % 60

    let hours2 = ('0' + hours).slice(-2) + ':'
    const minutes2 = ('0' + minutes).slice(-2)
    const seconds2 = ('0' + seconds).slice(-2)

    if (hours2 == '00:') hours2 = ''

    return hours2 + minutes2 + ':' + seconds2
  }

  setQuality(quality: string) {
    if (quality !== this.activeQuality) {
      this.activeQuality = quality
      this.onQualityChange.emit(quality)
    }
  }

  private _createBuffers() {
    const length = this.buffers.length
    this.buffersArray = [];
    for (let i = 0; i < length; i++) {
      const left = (this.buffers.start(i) / (this.duration)) * 100
      const width = ((this.buffers.end(i) - this.buffers.start(i)) / (this.duration)) * 100
      const array: Buffer = {left: left, width: width}
      this.buffersArray = [...this.buffersArray,array]
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code == 'Space' || event.code == 'KeyK') {
      if (this.video.paused) {
        this.playVideo()
      } else {
        this.pauseVideo()
      }
    }
    if (event.code == 'KeyF') {
      this.toggleFullscreen()
    }
    if (event.code == 'ArrowLeft') {
      if (this.video.currentTime < 5) {
        this.video.currentTime = 0
      } else {
        this.video.currentTime -= 5
      }
    }
    if (event.code == 'ArrowRight') {
      if (this.video.currentTime > this.duration - 5) {
        this.video.currentTime = this.duration
      } else {
        this.video.currentTime += 5
      }
    }
    if (event.code == 'ArrowUp') {
      if (this.volumeSliderValue <= 0.95) {
        this.volumeSliderValue = Number(this.volumeSliderValue) + 0.05
      } else {
        this.volumeSliderValue = 1
      }
      this._volumeChange()
    }
    if (event.code == 'ArrowDown') {
      if (this.volumeSliderValue >= 0.05) {
        this.volumeSliderValue -= 0.05
      } else {
        this.volumeSliderValue = 0
      }
      this._volumeChange()
    }
    if (event.code == 'KeyJ') {
      if (this.video.currentTime < 10) {
        this.video.currentTime = 0
      } else {
        this.video.currentTime -= 10
      }
    }
    if (event.code == 'KeyL') {
      if (this.video.currentTime > this.duration - 10) {
        this.video.currentTime = this.duration
      } else {
        this.video.currentTime += 10
      }
    }
    if (event.code.includes('Digit') || event.code == 'Backquote') {
      let number = Number(event.code.substr(5))
      if (number !== 0) {
        if (event.code == 'Backquote') number = 0;
        this.video.currentTime = this.duration / 10 * number
      }
    }
  }

  toggleSettingsMenu() {
    this.settingsMenu = !this.settingsMenu
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.settingsMenu) {
      if (!this.settingsMenuElement.nativeElement.contains(targetElement) && !this.settingsButton.nativeElement.contains(targetElement)) {
        this.settingsMenu = false
      }
    }
  }
}
