import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
})
export class LabelComponent implements OnInit {
  @Input() label: any

  constructor() {}

  ngOnInit() {}
}
