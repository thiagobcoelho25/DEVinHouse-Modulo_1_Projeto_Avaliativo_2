import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MAT_DATE_LOCALE } from '@angular/material/core';

import { LoginPageModule } from './pages/login-page/login-page.module';

import { AppointmentModule } from './pages/appointment/appointment.module';
import { ExamModule } from './pages/exam/exam.module';
import { HomeModule } from './pages/home/home.module';

import { ListMedicalRecordModule } from './pages/list-medical-record/list-medical-record.module';
import { MedicalRecordModule } from './pages/medical-record/medical-record.module';
import { RegistrationModule } from './pages/registration/registration.module';
import { LayoutContainerModule } from './pages/layout-container/layout-container.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    LayoutContainerModule,
    AppointmentModule,
    ExamModule,
    HomeModule,
    ListMedicalRecordModule,
    LoginPageModule,
    MedicalRecordModule,
    RegistrationModule,
    
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
