import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
  {path: '', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},
  {path: 'page', component: MainLayoutComponent, canActivate: [AuthGuard],  children: [
      {path: 'bill', loadChildren: () => import('./pages/bill/bill.module').then(m => m.BillModule)},
      {path: 'history', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule)},
      {path: 'record', loadChildren: () => import('./pages/record/record.module').then(m => m.RecordModule)},
      {path: '', redirectTo: 'bill', pathMatch: 'full'}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
