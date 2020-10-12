import { Component, OnInit } from '@angular/core';
import { InformationFacade } from '../../state/information/information.facade'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

@Component({
  selector: 'verseghy-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  content = 'asdasdasd'
  title = 'Lorem Ipsum'

  error$ = this.informationFacade.error$
  menu$ = this.informationFacade.menu$

  type$ = this.route.data.pipe(map(({type}) => type))
  slug$ = this.type$.pipe(
    switchMap((type) => {
      if (type === 'slug')
       return this.route.params.pipe(map(({slug}) => slug))
      return of(null)
    })
  )

  constructor(private route: ActivatedRoute, private informationFacade: InformationFacade) { }

  ngOnInit(): void {
    this.informationFacade.queryMenu()
  }

}
