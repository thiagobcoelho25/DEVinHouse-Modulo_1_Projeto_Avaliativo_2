import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterSearchBarComponent } from './filter-search-bar/filter-search-bar.component';
import { FilterSearchBarResponsiveComponent } from './filter-search-bar-responsive/filter-search-bar-responsive.component';
import { LoadingModalComponent } from './loading-modal/loading-modal.component';
import { MenuLeftBarComponent } from './menu-left-bar/menu-left-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CustomMaterialModule } from '../shared/custom-material/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FilterSearchBarComponent,
    FilterSearchBarResponsiveComponent,
    LoadingModalComponent,
    MenuLeftBarComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FilterSearchBarComponent,
    FilterSearchBarResponsiveComponent,
    LoadingModalComponent,
    MenuLeftBarComponent,
    NavBarComponent
  ]
})
export class ComponentsModule { }
