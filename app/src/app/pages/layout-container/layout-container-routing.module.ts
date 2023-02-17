import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/security/auth.guard';
import { HomeComponent } from '../home/home.component';
import { LayoutContainerComponent } from './layout-container.component';

const routes: Routes = [
  {
    path: '', component: LayoutContainerComponent, canActivate: [AuthGuard], children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '' },
      {
        path: 'registration', loadChildren: () => import('../registration/registration.module').then(m => m.RegistrationModule)
      },
      { path: 'list_medical_record', loadChildren: () => import('../list-medical-record/list-medical-record.module').then(m => m.ListMedicalRecordModule) },
      { path: 'medical_record/:id', loadChildren: () => import('../medical-record/medical-record.module').then(m => m.MedicalRecordModule)  },
      {path: 'registration_medical_appointment', loadChildren: () => import('../appointment/appointment.module').then(m => m.AppointmentModule)},
      {path: 'registration_medical_exam', loadChildren: () => import('../exam/exam.module').then(m => m.ExamModule)}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutContainerRoutingModule { }
