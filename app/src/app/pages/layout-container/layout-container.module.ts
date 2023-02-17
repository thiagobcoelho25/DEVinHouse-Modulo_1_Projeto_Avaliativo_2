import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerRoutingModule } from './layout-container-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LayoutContainerComponent } from './layout-container.component';
import { AuthGuard } from 'src/app/security/auth.guard';


@NgModule({
  declarations: [
    LayoutContainerComponent
  ],
  imports: [
    CommonModule,
    LayoutContainerRoutingModule,
    ComponentsModule
  ], providers: [
    AuthGuard
  ]
})
export class LayoutContainerModule { }
