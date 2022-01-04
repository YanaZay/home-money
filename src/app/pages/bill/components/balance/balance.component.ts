import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { IExchangeInterface } from '../../../../shared/models/exchange.interface';
import { getBalanceAction } from '../../store/actions/balance.action';
import { ICurrentBalance } from '../../../../shared/models/current-balance.interface';
import { currentBalanceSelector } from '../../store/selectors';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  @Input() public dataRates!: IExchangeInterface;
  public bill!: number;
  public currentBalance$!: Observable<ICurrentBalance | null>;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(getBalanceAction());
    this.initializeValue();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeValue(): void {
    this.currentBalance$ = this.store.pipe(select(currentBalanceSelector));
  }
}
