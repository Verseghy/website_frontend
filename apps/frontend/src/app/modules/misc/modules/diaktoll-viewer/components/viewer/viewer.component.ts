import { Component, HostBinding, OnInit } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { map, takeUntil } from 'rxjs/operators'
import { fromEvent, Observable } from 'rxjs'

const breakpoints = {
  Medium: '(max-width: 991.99px)',
  Large: '(min-width: 992px)',
}

@Component({
  selector: 'verseghy-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  @HostBinding('class.no-absolute') hasClass = false
  zoom$: Observable<number> = this.breakpointObserver.observe([breakpoints.Medium, breakpoints.Large]).pipe(
    map((res) => {
      if (res.breakpoints[breakpoints.Medium]) return 1
      if (res.breakpoints[breakpoints.Large]) return 0.5
    })
  )

  width$ = fromEvent(window, 'resize').pipe(map(() => `${window.innerWidth}px`))

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
