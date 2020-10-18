import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
