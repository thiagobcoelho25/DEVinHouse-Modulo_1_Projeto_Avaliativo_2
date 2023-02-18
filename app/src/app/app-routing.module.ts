import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/layout-container/layout-container.module').then(m => m.LayoutContainerModule)},
  {path: 'logout', redirectTo: 'login'},
  { path: '**', redirectTo: 'login' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }