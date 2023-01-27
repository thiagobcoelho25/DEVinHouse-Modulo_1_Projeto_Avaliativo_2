import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form_login: FormGroup

  constructor(private fb: FormBuilder, private login_service: LoginServiceService, private router: Router) {
    this.form_login = this.criarFormLogin()
  }

  ngOnInit(): void {

  }


  private criarFormLogin(): FormGroup {
    return this.fb.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  public subimitForm() {
    const { username, password } = this.form_login.value
    this.form_login.reset()

    this.login_service.login(username, password).subscribe({
      next: value => {
        console.log('Sucesso no Login: ', value)
        this.router.navigate(['']);
      }, error: err => {
        console.log('error no login:  ', err)
      },
    })
  }
}
