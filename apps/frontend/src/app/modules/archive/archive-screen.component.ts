import { Component, OnInit } from '@angular/core';
import { ArchiveFacade } from './state/archive.facade'

@Component({
  selector: 'verseghy-archive-screen',
  templateUrl: './archive-screen.component.html',
  styleUrls: ['./archive-screen.component.scss']
})
export class ArchiveScreenComponent implements OnInit {

  archives$ = this.archiveFacade.archives$

  constructor(private archiveFacade: ArchiveFacade) { }

  ngOnInit() {
    this.archiveFacade.loadArchives()
  }

}
