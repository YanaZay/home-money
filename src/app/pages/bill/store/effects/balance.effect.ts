import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  currentBalanceAction,
  getBalanceAction,
} from '../actions/balance.action';
import { map, switchMap } from 'rxjs/operators';
import { BillService } from '../../bill.service';
import { ICurrentBalance } from '../../../../shared/models/current-balance.interface';

@Injectable()
export class BalanceEffect {
  public balance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBalanceAction),
      switchMap(() => {
        return this.billService.getBalance().pipe(
          map((currentBalance: ICurrentBalance) => {
            console.log(currentBalance);
            return currentBalanceAction({ currentBalance: currentBalance });
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private billService: BillService) {}
}