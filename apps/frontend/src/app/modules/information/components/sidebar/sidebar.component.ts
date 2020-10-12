import { Component, Input, OnInit } from '@angular/core'
import { MenuItem } from '../../models/menu-item'
import { Router } from '@angular/router'
import { InformationFacade } from '../../state/information/information.facade'

@Component({
  selector: 'verseghy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() data: MenuItem[]

  constructor(private router: Router, private informationFacade: InformationFacade) {}

  ngOnInit(): void {}

  loadPage(slug: string): void {
    this.informationFacade.queryPageBySlug(slug)
    this.router.navigate(['/information', slug])
  }
}
