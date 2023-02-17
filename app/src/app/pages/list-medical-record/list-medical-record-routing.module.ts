import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicalRecordComponent } from './list-medical-record.component';

const routes: Routes = [
  {path: '', component: ListMedicalRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMedicalRecordRoutingModule { }
