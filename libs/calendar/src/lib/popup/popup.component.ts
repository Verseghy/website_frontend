import { Component, HostListener, Input, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  @Input() event: Event | Event[]
  @Input() moreEvents = false
  public show = false

  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  onClick() {
    this.show = !this.show
  }
}
