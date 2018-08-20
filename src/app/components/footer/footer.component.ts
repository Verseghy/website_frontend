import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild('subscribeButton') subscribeButton: ElementRef;
  @ViewChild('buttonText') buttonText: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;
  spinnerVisible = false;
  checkMarkVisible = false;

  constructor() { }

  ngOnInit() {
  }

  subscribeToNewsletter() {

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.emailInput.nativeElement.value)) {
      this.spinnerVisible = true;
      this.buttonText.nativeElement.setAttribute('hidden', 'true');
      this.subscribeButton.nativeElement.setAttribute('disabled', 'true');

      console.dir(this.emailInput.nativeElement.value);
      this.emailInput.nativeElement.value = '';
      setTimeout(() => this._subscribeConfirmed(), 3000);
    } else {
      alert('Hibás email-cím!');
    }

  }

  private _subscribeConfirmed() {
    this.spinnerVisible = false;
    this.subscribeButton.nativeElement.className += ' done';
    this.checkMarkVisible = true;
  }
}
