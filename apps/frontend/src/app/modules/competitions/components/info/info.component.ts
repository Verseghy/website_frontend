import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompetitionsFacade } from "../../state/competitions/competitions.facade";
import { SubSink } from "subsink";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'verseghy-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  private subsink = new SubSink()

  private _visibleSections = new Map<number, boolean>();

  loaded$: Observable<boolean>
  inviewport = 0

  constructor(private route: ActivatedRoute, private facade: CompetitionsFacade) { }

  ngOnInit() {
    this.subsink.sink = this.route.params.subscribe(params => {
      if (!('id' in params)) return
      if (isNaN(params.id)) return
      // this.facade.queryRecentCompetitions()
      this.facade.selectCompetition(params.id)
    })

    this.loaded$ = this.facade.selectedCompetition$.pipe(map(competition => !!competition))
  }

  setVisible(section: number, visible: boolean): void {
    this._visibleSections.set(section, visible)

    for (const entry of this._visibleSections.entries()) {
      if (entry[1]) {
        this.inviewport = entry[0]
        break
      }
    }
  }

  ngOnDestroy() {
    this.subsink.unsubscribe()
  }

}
