import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBill } from '../../../../shared/types/bill.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IExchangeInterface } from '../../../../shared/types/exchange.interface';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  @Input() public dataRates!: IExchangeInterface;
  public bill!: number;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http
      .get<IBill>('/bill')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IBill) => {
        this.bill = data.value;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
