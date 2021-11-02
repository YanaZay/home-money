import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './components/balance/balance.component';
import { MaterialModule } from '../../shared/material.module';
import { BillService } from "./bill.service";
import { CurrentComponent } from './components/current/current.component';

const routes: Routes = [{path: '', component: BillComponent,}];

@NgModule({
  declarations: [
    BillComponent,
    BalanceComponent,
    CurrentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [
    BillService
  ]
})
export class BillModule {}
