import { Component, Input, OnInit } from '@angular/core'
import { MenuItem } from '../../models/menu-item'

@Component({
  selector: 'verseghy-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() data: MenuItem[]

  constructor() { }

  ngOnInit(): void {
  }

}
