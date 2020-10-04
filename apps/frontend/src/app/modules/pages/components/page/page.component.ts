import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

@Component({
  selector: 'verseghy-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  slug$ = this.route.params.pipe(map(({ slug }) => slug))

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
