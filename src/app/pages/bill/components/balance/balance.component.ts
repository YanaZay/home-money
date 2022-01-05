import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { IExchangeInterface } from '../../../../shared/types/exchange.interface';
import { ICurrentBalance } from '../../../../shared/types/current-balance.interface';
import { currentBalanceSelector } from '../../store/selectors';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  @Input() public dataRates!: IExchangeInterface | null;
  public currentBalance$!: Observable<ICurrentBalance | null>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.initializeValue();
  }

  public initializeValue(): void {
    this.currentBalance$ = this.store.pipe(select(currentBalanceSelector));
  }
}
