import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as problemActions from "../../reducers/problem/problem.actions";
import * as authActions from "../../../../reducers/auth/auth.actions";
import * as solutionActions from "../../reducers/solution/solution.actions";
import { Store } from "@ngrx/store";
import { fromEvent, interval, Observable } from "rxjs";
import { debounceTime, distinct, map, tap } from "rxjs/operators";
import { KeyValue } from "@angular/common";

declare var MathJax: any;

@Component({
  selector: 'verseghy-competitionscreen',
  templateUrl: './competitionscreen.component.html',
  styleUrls: ['./competitionscreen.component.scss']
})
export class CompetitionscreenComponent implements OnInit {

  problems: Observable<any>;
  solutions: Observable<any>;
  timestring = '04:00:00';

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.problems = this.store.select('competition').pipe(
      map(x => {
        return x.problem;
      })
    );
    this.store.dispatch(new problemActions.Query());
    this.problems.subscribe(x => {
      if (x.ids.length >= 40) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      }
    });

    fromEvent(document, 'scroll').pipe(
      debounceTime(200),
      distinct(),
      tap(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      })
    ).subscribe();

    this.store.dispatch(new solutionActions.Query());

    interval(1000).subscribe(() => {
      const enddate = new Date('2018-12-14 18:00:00'); // TODO
      const now = new Date();

      const distance = enddate.getTime() - now.getTime();

      if (distance < 0) {
        this.router.navigate(['/after']);
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timestring = hours.toString().padStart(2, '0') + ':' +
                        minutes.toString().padStart(2, '0') + ':' +
                        seconds.toString().padStart(2, '0');
    });
  }

  logoutHandler () {
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/login']);
  }

  comparator(a: KeyValue<any, any>, b: KeyValue<any, any>) {
    if (a.value.id === b.value.id) {
      return 0;
    }
    return a.value.id < b.value.id ? -1 : 1;
  }

}
