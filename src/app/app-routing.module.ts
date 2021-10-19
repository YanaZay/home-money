import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'page', component: MainLayoutComponent, children: [
      {path: 'bill', loadChildren: () => import('./pages/bill/bill.module').then(m => m.BillModule)},
      {path: '', redirectTo: 'bill', pathMatch: 'full'}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
