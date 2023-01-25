import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLeftBarComponent } from './components/menu-left-bar/menu-left-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListMedicalRecordComponent } from './pages/list-medical-record/list-medical-record.component';
import { FilterSearchBarComponent } from './components/filter-search-bar/filter-search-bar.component';
import { CalcularAnosPorDataPipe } from './shared/pipes/calcular-anos-por-data.pipe';
import { MascaraCpfPipe } from './shared/pipes/mascara-cpf.pipe';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLeftBarComponent,
    HomeComponent,
    NavBarComponent,
    RegistrationComponent,
    ListMedicalRecordComponent,
    FilterSearchBarComponent,
    CalcularAnosPorDataPipe,
    MascaraCpfPipe,
    LoadingModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
