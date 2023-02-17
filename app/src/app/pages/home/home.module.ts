import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CalcularAnosPorDataPipe } from 'src/app/shared/pipes/calcular-anos-por-data.pipe';
import { CustomMaterialModule } from 'src/app/shared/custom-material/custom-material.module';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [HomeComponent, CalcularAnosPorDataPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CustomMaterialModule,
    ComponentsModule
  ]
})
export class HomeModule { }
