import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from './bill.service';
import { IExchangeInterface } from '../../shared/types/exchange.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit, OnDestroy {
  public rates!: IExchangeInterface;
  public loading: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private billService: BillService) {}

  public ngOnInit(): void {
    this.getData();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getData(): void {
    this.billService
      .getExchangeRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IExchangeInterface) => {
        this.rates = data;
        this.loading = false;
      });
  }
}
