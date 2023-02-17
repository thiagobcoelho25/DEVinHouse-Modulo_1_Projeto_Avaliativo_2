import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './exam.component';

const routes: Routes = [
  {path: '', component: ExamComponent},
  {path: 'registration_medical_exam/:id', component: ExamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
