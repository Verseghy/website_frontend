import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
