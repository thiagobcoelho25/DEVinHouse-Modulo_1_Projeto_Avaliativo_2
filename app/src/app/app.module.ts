import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLeftBarComponent } from './components/menu-left-bar/menu-left-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ListMedicalRecordComponent } from './pages/list-medical-record/list-medical-record.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { CalcularAnosPorDataPipe } from './shared/pipes/calcular-anos-por-data.pipe';
import { MascaraCpfPipe } from './shared/pipes/mascara-cpf.pipe';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { MedicalRecordComponent } from './pages/medical-record/medical-record.component';

import { LayoutContainerComponent } from './pages/layout-container/layout-container.component';

import { AuthGuard } from './security/auth.guard';

import { AppointmentComponent } from './pages/appointment/appointment.component';
import { FilterSearchBarResponsiveComponent } from './components/filter-search-bar-responsive/filter-search-bar-responsive.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ExamComponent } from './pages/exam/exam.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { CustomMaterialModule } from './shared/custom-material/custom-material.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuLeftBarComponent,
    HomeComponent,
    NavBarComponent,
    RegistrationComponent,
    ListMedicalRecordComponent,
    FilterSearchBarComponent,
    CalcularAnosPorDataPipe,
    MascaraCpfPipe,
    LoadingModalComponent,
    MedicalRecordComponent,

    LayoutContainerComponent,
    
    AppointmentComponent,
    FilterSearchBarResponsiveComponent,
    ExamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginPageModule,

    
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
