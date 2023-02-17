import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRecordRoutingModule } from './medical-record-routing.module';
import { MedicalRecordComponent } from './medical-record.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [MedicalRecordComponent],
  imports: [
    CommonModule,
    MedicalRecordRoutingModule,
    ComponentsModule
  ]
})
export class MedicalRecordModule { }
