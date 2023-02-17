import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMedicalRecordRoutingModule } from './list-medical-record-routing.module';
import { ListMedicalRecordComponent } from './list-medical-record.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [ListMedicalRecordComponent],
  imports: [
    CommonModule,
    ListMedicalRecordRoutingModule,
    ComponentsModule
  ]
})
export class ListMedicalRecordModule { }
