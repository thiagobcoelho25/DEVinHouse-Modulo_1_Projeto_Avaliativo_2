import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListMedicalRecordComponent } from './pages/list-medical-record/list-medical-record.component';
import { MedicalRecordComponent } from './pages/medical-record/medical-record.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }, { path: 'home', component: HomeComponent }, {
  path: 'registration', component: RegistrationComponent
}, { path: 'registration/:id', component: RegistrationComponent }
  , {
  path: 'list_medical_record', component: ListMedicalRecordComponent},
{path: 'medical_record/:id', component: MedicalRecordComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
