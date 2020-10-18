import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
