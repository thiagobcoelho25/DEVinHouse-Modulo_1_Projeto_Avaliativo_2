import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateAccountComponent } from './modal-create-account/modal-create-account.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form_login: FormGroup

  constructor(private fb: FormBuilder, private login_service: LoginServiceService, private router: Router, public dialog: MatDialog, private snack_bar: MatSnackBar) {
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
    this.form_login.disable()

    this.login_service.login(username, password).subscribe({
      next: value => {
        this.router.navigate(['']);
      }, error: err => {
        console.log('error no login:  ', err)
        this.form_login.enable()
        this.openSnackBarErroAPI()
      },
    })
  }

  openSnackBarErroAPI() {
    this.snack_bar.open('Erro na API de Login', "", {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  criarConta(): void {
    const dialogRef = this.dialog.open(ModalCreateAccountComponent, {
      width: '33%',
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
