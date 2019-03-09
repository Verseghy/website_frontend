import { Component, OnInit } from '@angular/core'
import { Buffer } from '../../videoplayer.interface'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { map, startWith, tap } from 'rxjs/operators'
import { VideoService } from '../../services/video.service'

@Component({
  selector: 'verseghy-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss'],
})
export class ProgressbarComponent implements OnInit {
  color: string
  buffers$: BehaviorSubject<Buffer[]>
  time$: Observable<number>
  disabled$: Observable<boolean>
  duration$: Subject<number>
  progressbarValue$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.time$ = this.videoService.time$.pipe(
      tap(time => {
        this.progressbarValue$.next(time)
      })
    )
    this.disabled$ = this.videoService.duration$.pipe(
      startWith(false),
      map(duration => {
        return !duration
      })
    )
    this.color = this.videoService.color
    this.buffers$ = this.videoService.buffers$
    this.duration$ = this.videoService.duration$
  }

  changeProgress(event: any) {
    this.progressbarValue$.next(event.target.value)
    this.videoService.video.currentTime = event.target.value
  }
}
