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
import { GetBalanceEffect } from './store/effects/get-balance.effect';
import { GetExchangeRatesEffect } from './store/effects/get-exchange-rates.effect';

const routes: Routes = [{ path: '', component: BillComponent }];

@NgModule({
  declarations: [BillComponent, BalanceComponent, CurrentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    StoreModule.forFeature('bill', billReducer),
    EffectsModule.forFeature([GetBalanceEffect, GetExchangeRatesEffect]),
  ],
  providers: [BillService],
})
export class BillModule {}
