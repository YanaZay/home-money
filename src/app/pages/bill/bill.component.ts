import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from "./bill.service";
import { IExchangeInterface } from "../../shared/models/exchange.interface";
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBill } from "../../shared/models/bill.interface";

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit, OnDestroy {
  public rates!: IExchangeInterface;
  public bill!: IBill;
  public loading: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private billService: BillService) {}

  public ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    forkJoin([
      this.billService.getExchangeRates(),
      this.billService.getBill()
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([ratesData, billData]: [IExchangeInterface, IBill]) => {
      this.rates = ratesData;
      this.bill = billData;
      this.loading = false;
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
