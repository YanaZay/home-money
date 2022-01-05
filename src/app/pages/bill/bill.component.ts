import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { IExchangeInterface } from '../../shared/types/exchange.interface';
import { getExchangeRatesAction } from './store/actions/get-exchange-rates.action';
import { getBalanceAction } from './store/actions/get-balance.action';
import { exchangeRatesSelector, isLoadingSelector } from './store/selectors';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  public rates$!: Observable<IExchangeInterface | null>;
  public isLoading$!: Observable<boolean>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.rates$ = this.store.pipe(select(exchangeRatesSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  public fetchData(): void {
    this.store.dispatch(getBalanceAction());
    this.store.dispatch(getExchangeRatesAction());
  }
}
