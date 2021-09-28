import { Component, OnInit } from '@angular/core';
import { FormControl, Validator, Validators } from "@angular/forms"

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailInput: FormControl
  constructor(

  ) { this.emailInput = new FormControl('', [Validators.required, Validators.email]) }

  ngOnInit() {
  }

  registerMail() {
    console.log(this.emailInput.valid)
  }
}
