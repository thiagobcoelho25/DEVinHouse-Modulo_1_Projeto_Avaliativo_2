import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutContainerComponent } from './pages/layout-container/layout-container.component';
import { ListMedicalRecordComponent } from './pages/list-medical-record/list-medical-record.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MedicalRecordComponent } from './pages/medical-record/medical-record.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: '', component: LayoutContainerComponent, canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '' },
      {
        path: 'registration', component: RegistrationComponent
      },
      { path: 'registration/:id', component: RegistrationComponent }
      ,{ path: 'list_medical_record', component: ListMedicalRecordComponent },
      { path: 'medical_record/:id', component: MedicalRecordComponent },
      {path: 'registration_medical_appointment', component: AppointmentComponent}
    ],
  },
  {path: 'logout', redirectTo: 'login'},
  { path: '**', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
