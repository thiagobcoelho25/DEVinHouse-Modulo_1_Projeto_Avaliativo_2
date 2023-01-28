import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { Usuario } from 'src/app/shared/interfaces/usuario';

@Component({
  selector: 'app-modal-create-account',
  templateUrl: './modal-create-account.component.html',
  styleUrls: ['./modal-create-account.component.scss']
})
export class ModalCreateAccountComponent implements OnInit {
  public form_cadatro: FormGroup
  hide: boolean = true


  constructor(public dialogRef: MatDialogRef<ModalCreateAccountComponent>, private fb: FormBuilder, private login_api: LoginServiceService, private snack_bar: MatSnackBar) {
    this.form_cadatro = this.fb.group({
      nome: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(8)]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      exact_password: new FormControl("", [Validators.required, this.exactPasswordValidator('password')]),
    })
  }


  ngOnInit(): void {
  }

  onClickCreateUser() {
    if (this.form_cadatro.valid) {
      const new_user: Usuario = {id: null, name: this.form_cadatro.get('nome')?.value, email: this.form_cadatro.get('email')?.value, password: this.form_cadatro.get('password')?.value  }

      this.login_api.getUsers(new_user).subscribe({next: next => {
        console.log("usuario criado")
      }, error: (err: Error) => {
        this.openSnackBarErroAPI(err.message)
        console.log("Erro na APi de Criação de Login", err)
      },})

    }
  }

  openSnackBarErroAPI(message: string) {
    this.snack_bar.open('Erro na API de Login', "", {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  onClickCloseDialog(): void {
    this.dialogRef.close();
  }

  getIsValided(control: string): boolean {
    return this.form_cadatro.controls[control].valid && (this.form_cadatro.controls[control].dirty || this.form_cadatro.controls[control].touched)
  }

  getErrorMessageNome() {
    return this.form_cadatro.get('nome')?.hasError('required') ? 'Nome é Obrigatorio' : '';
  }

  getErrorMessageEmail() {
    if (this.form_cadatro.get('email')?.hasError('required')) {
      return 'Email é Obrigatorio';
    } else if (this.form_cadatro.get('email')?.hasError('email')) {
      return 'Email invalido'
    }

    return this.form_cadatro.get('email')?.hasError('minlength') ? 'Email precisa de no minimo 8 caracteres' : '';
  }

  getErrorMessageSenha() {
    if (this.form_cadatro.get('password')?.hasError('required')) {
      return 'Senha é Obrigatorio';
    }

    return this.form_cadatro.get('password')?.hasError('minlength') ? 'Senha precisa de no minimo 8 caracteres' : '';
  }

  getErrorMessageConfirmacaoSenha() {
    if (this.form_cadatro.get('exact_password')?.hasError('required')) {
      return 'Confirmação de Senha Obrigatorio';
    }

    return this.form_cadatro.get('exact_password')?.hasError('exactPasswordInvalid') ? 'Senha não são iguais' : '';
  }


  exactPasswordValidator(senha: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let value = control.value;
      if (value === control.parent?.get(senha)?.value) {
        return null
      }
      return { 'exactPasswordInvalid': true };
    }
  }

}
