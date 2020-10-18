import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentPostsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
