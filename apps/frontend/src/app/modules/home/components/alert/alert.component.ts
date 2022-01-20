import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
