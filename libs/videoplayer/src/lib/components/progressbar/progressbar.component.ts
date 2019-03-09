import { Component, OnInit } from '@angular/core'
import { Buffer } from '../../videoplayer.interface'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { VideoService } from '../../services/video.service'

@Component({
  selector: 'verseghy-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {

  color: string
  progressBarWidth: number
  buffers$: BehaviorSubject<Buffer[]>
  time$: Observable<number> = of(0)

  constructor(
    private videoService: VideoService,
  ) { }

  ngOnInit() {
    this.time$ = this.videoService.time$.pipe(
      map((time) => {
        return time / this.videoService.duration
      })
    )
    this.color = this.videoService.color
    this.buffers$ = this.videoService.buffers$
  }

  changeProgress(event: Event) {
    console.log(event)
  }

}
