import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { MascaraCpfPipe } from 'src/app/shared/pipes/mascara-cpf.pipe';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [RegistrationComponent, MascaraCpfPipe],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class RegistrationModule { }
