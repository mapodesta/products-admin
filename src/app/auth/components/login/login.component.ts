import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  form: FormGroup

  constructor(private authservice: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.buildForm()
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    console.log(this.form.value)
    if (this.form.valid) {
      const value = this.form.value;
      this.authservice.login(value.email, value.password)
        .then(() => {
          this.router.navigate(['/admin']);
        }).catch(() => {
          alert("User no Valido")
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    })
  }


}
