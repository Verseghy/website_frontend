import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
