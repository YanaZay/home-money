import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IBill } from "../../../../shared/models/bill.interface";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IExchangeInterface } from '../../../../shared/models/exchange.interface';
import {BillService} from "../../bill.service";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent implements OnInit, OnDestroy {
  @Input() public dataRates!: IExchangeInterface;
  public bill!: number;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private billService: BillService) {}

  public ngOnInit(): void {
    this.billService.getBill()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:IBill) => {
        this.bill = data.value;
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
