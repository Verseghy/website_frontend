import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  buttonTextVisible = true;
  spinnerVisible = false;
  checkMarkVisible = false;
  email: string;
  subscribeButtonDisabled = false;
  subscribeButtonDone = false;

  constructor() { }

  ngOnInit() {
  }

  subscribeToNewsletter() {

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
      this.spinnerVisible = true;
      this.buttonTextVisible = false;
      this.subscribeButtonDisabled = true;
      console.log(this.email);
      this.email = '';
      setTimeout(() => this._subscribeConfirmed(), 3000);
    } else {
      alert('Hibás email-cím!');
    }

  }

  private _subscribeConfirmed() {
    this.spinnerVisible = false;
    this.subscribeButtonDone = true;
    this.checkMarkVisible = true;
  }
}
