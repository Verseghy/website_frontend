import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'verseghy-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  content = 'asdasdasd'
  title = 'Lorem Ipsum'

  constructor() { }

  ngOnInit(): void {
  }

}
