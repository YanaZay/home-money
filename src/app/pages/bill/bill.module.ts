import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BillComponent } from './bill.component';
import { BalanceComponent } from './components/balance/balance.component';
import { MaterialModule } from '../../shared/material.module';
import { BillService } from './bill.service';
import { CurrentComponent } from './components/current/current.component';
import { billReducer } from './store/reducers';
import { BalanceEffect } from './store/effects/balance.effect';

const routes: Routes = [{ path: '', component: BillComponent }];

@NgModule({
  declarations: [BillComponent, BalanceComponent, CurrentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    StoreModule.forFeature('bill', billReducer),
    EffectsModule.forFeature([BalanceEffect]),
  ],
  providers: [BillService],
})
export class BillModule {}
