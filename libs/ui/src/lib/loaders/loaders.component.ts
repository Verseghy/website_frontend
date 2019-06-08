import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.scss'],
})
export class LoadersComponent implements OnInit {
  @Input() loader: string
  @Input() loaderClass: string

  nodes: number[] = []

  private _loaders: { [name: string]: number } = {
    'ball-pulse': 3,
    'ball-grid-pulse': 9,
    'ball-clip-rotate': 1,
    'ball-clip-rotate-pulse': 2,
    'square-spin': 1,
    'ball-clip-rotate-multiple': 2,
    'ball-pulse-rise': 5,
    'ball-rotate': 1,
    'cube-transition': 2,
    'ball-zig-zag': 2,
    'ball-zig-zag-deflect': 2,
    'ball-triangle-path': 3,
    'ball-scale': 1,
    'line-scale': 5,
    'line-scale-party': 4,
    'ball-scale-multiple': 3,
    'ball-pulse-sync': 3,
    'ball-beat': 3,
    'line-scale-pulse-out': 5,
    'line-scale-pulse-out-rapid': 5,
    'ball-scale-ripple': 1,
    'ball-scale-ripple-multiple': 3,
    'ball-spin-fade-loader': 8,
    'line-spin-fade-loader': 8,
    'triangle-skew-spin': 1,
    pacman: 5,
    'ball-grid-beat': 9,
    'semi-circle-spin': 1,
  }

  ngOnInit() {
    for (let i = 0; i < this._loaders[this.loader]; i++) {
      this.nodes.push(i)
    }
  }
}
