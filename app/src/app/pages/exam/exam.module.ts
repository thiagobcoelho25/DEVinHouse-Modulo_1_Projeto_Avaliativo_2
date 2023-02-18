import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CustomMaterialModule } from 'src/app/shared/custom-material/custom-material.module';


@NgModule({
  declarations: [ExamComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ]
})
export class ExamModule { }
