import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page.component';
import { ModalCreateAccountComponent } from './modal-create-account/modal-create-account.component';
import { CustomMaterialModule } from 'src/app/shared/custom-material/custom-material.module';
import { LogonPageRoutingModule } from './login-page-routing.module';



@NgModule({
  declarations: [LoginPageComponent, ModalCreateAccountComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    LogonPageRoutingModule
  ]
})
export class LoginPageModule { }
