import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Buffer } from '../videoplayer.interface';

@Injectable()
export class VideoService {

  time$: BehaviorSubject<number> = new BehaviorSubject(0)
  color: string = 'red'
  buffers$: BehaviorSubject<Buffer[]> = new BehaviorSubject([])
  duration: number = 0

  constructor() { }
}
