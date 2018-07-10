import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  subscribeToNewsletter() {
    const button = document.getElementsByClassName('subscribeButton')[0];
    const spinner = document.getElementsByClassName('spinner')[0];
    const buttonText = button.getElementsByClassName('buttonText')[0];
    const emailInput = <HTMLInputElement>document.getElementsByClassName('emailInput')[0];


    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value)) {
      spinner.removeAttribute('hidden');
      buttonText.setAttribute('hidden', 'true');
      button.setAttribute('disabled', 'true');

      console.dir(emailInput.value);
      emailInput.value = '';
      setTimeout(() => this.subscribeConfirmed(), 3000);
    } else {
      alert('Hibás email-cím!');
    }

  }

  subscribeConfirmed() {
    const button = document.getElementsByClassName('subscribeButton')[0];
    const spinner = document.getElementsByClassName('spinner')[0];
    const buttonText = button.getElementsByClassName('buttonText')[0];

    spinner.setAttribute('hidden', 'true');
    buttonText.removeAttribute('hidden');
    button.className += ' done';
    buttonText.innerHTML = '✔';
  }

}
