import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListMedicalRecordComponent } from './pages/list-medical-record/list-medical-record.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }, { path: 'home', component: HomeComponent }, {
  path: 'registration', component: RegistrationComponent, children: [
    { path: ':id', component: RegistrationComponent }
  ]
}, {path: 'list_medical_record', component: ListMedicalRecordComponent, children: [
  // {path: ':id'}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
