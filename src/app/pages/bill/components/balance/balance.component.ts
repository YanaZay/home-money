import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { IBill } from "../../../../shared/models/bill.interface";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  public bill!: number;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.http.get<IBill>(`${environment.apiHost}/bill`)
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
