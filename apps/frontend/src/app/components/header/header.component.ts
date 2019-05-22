import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  drawer: boolean
  submenu1: boolean
  submenu2: boolean
  kretaSubmenu: boolean
  constructor() {}

  ngOnInit() {}
}
