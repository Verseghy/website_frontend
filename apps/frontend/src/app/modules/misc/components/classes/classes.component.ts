import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
