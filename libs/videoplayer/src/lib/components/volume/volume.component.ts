import { Component, OnInit, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { VideoService } from '../../services/video.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootState } from '../../+state/root.reducer';
import { Mute, SetLastVolume, VolumeChange, VolumeUp, VolumeDown } from '../../+state/root.actions';

@Component({
  selector: 'verseghy-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {

  muted$: Observable<boolean>
  color: string
  video: HTMLVideoElement
  lastVolume: number
  volumeSliderValue: number
  pressMuteEvent$ = new BehaviorSubject(false)
  volume$: Observable<number>

  constructor(
    private videoService: VideoService,
    private store: Store<{ root: RootState }>
  ) {}

  ngOnInit() {
    this.color = this.videoService.color
    this.video = this.videoService.video
    this.muted$ = this.store.pipe(
      map(store => {
        return store.root.volume.currentVolume === 0
      })
    )
    this.volume$ = this.store.pipe(
      map(state => {
        return state.root.volume.currentVolume
      })
    )
  }

  volumeChange(event: any) {
    this.store.dispatch(new VolumeChange(Number(event.target.value)))
  }

  toggleMute() {
    this.store.dispatch(new Mute())
  }

  volumeSliderClick() {
    this.store.dispatch(new SetLastVolume())
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowUp':
        this.store.dispatch(new VolumeUp())
        break

      case 'ArrowDown':
        this.store.dispatch(new VolumeDown())
        break

      case 'KeyM':
        this.store.dispatch(new Mute())
        break
    }
  }
}
