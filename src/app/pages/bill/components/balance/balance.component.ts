import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IExchangeInterface } from '../../../../shared/models/exchange.interface';
import { Store } from '@ngrx/store';
import { getBalanceAction } from '../../store/actions/balance.action';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit, OnDestroy {
  @Input() public dataRates!: IExchangeInterface;
  public bill!: number;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {}

  public ngOnInit(): void {
    this.initializeValue();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeValue(): void {
    this.store.dispatch(getBalanceAction());
    // this.http
    //   .get<IBill>(`${environment.apiHost}/bill`)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: IBill) => {
    //     this.bill = data.value;
    //   });
  }
}
