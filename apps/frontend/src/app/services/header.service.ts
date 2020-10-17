import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  useBigHeader$ = new BehaviorSubject(false)

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(({ url }: NavigationEnd) => url === '/')
    ).subscribe(this.useBigHeader$)
  }
}
