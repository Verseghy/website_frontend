import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'verseghy-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss']
})
export class HomescreenComponent implements OnInit {

  timestring: string;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    interval(1000).subscribe(() => {
      const startdate = new Date('2018-12-14 13:00:00'); // TODO
      const now = new Date();

      const distance = startdate.getTime() - now.getTime();

      if (distance < 0) {
        this.router.navigate(['/login']);
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.timestring = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');
    });
  }

}
