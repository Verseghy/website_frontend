import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'verseghy-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  drawer: boolean
  submenu1: boolean
  submenu2: boolean

  searchTerm: string

  constructor(private router: Router) {}

  ngOnInit() {}

  search(event) {
    if (event.key === 'Enter') {
      this.router.navigate(['search', 'term', this.searchTerm])
      this.drawer = false
    }
  }
}
