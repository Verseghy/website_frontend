import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'verseghy-loginscreen',
  templateUrl: './loginscreen.component.html',
  styleUrls: ['./loginscreen.component.scss'],
})
export class LoginscreenComponent implements OnInit {

  form = this.fb.group({
    username: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  })

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit () {
  }

  onSubmit () {
    console.log(this.form.valid)
  }
}
