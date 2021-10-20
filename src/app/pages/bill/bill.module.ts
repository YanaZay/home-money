import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillComponent } from './bill.component';
import { RouterModule, Routes } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [{path: '', component: BillComponent}];

@NgModule({
  declarations: [BillComponent, BalanceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})
export class BillModule { }
