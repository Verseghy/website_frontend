import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'verseghy-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() inviewport: string

  constructor() { }

  ngOnInit(): void {
  }

}
