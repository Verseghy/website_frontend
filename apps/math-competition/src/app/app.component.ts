import { ApplicationRef, Component, OnInit } from '@angular/core'

@Component({
  selector: 'verseghy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private appRef: ApplicationRef) {}

  ngOnInit () {
    this.appRef.isStable.subscribe((stable) => {console.log(stable)})
  }
}
