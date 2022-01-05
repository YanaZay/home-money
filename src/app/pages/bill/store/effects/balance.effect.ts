import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getBalanceSuccessAction,
  getBalanceAction,
} from '../actions/balance.action';
import { map, switchMap } from 'rxjs/operators';
import { BillService } from '../../bill.service';
import { ICurrentBalance } from '../../../../shared/types/current-balance.interface';

@Injectable()
export class BalanceEffect {
  public balance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBalanceAction),
      switchMap(() => {
        return this.billService.getBalance().pipe(
          map((currentBalance: ICurrentBalance) => {
            console.log(currentBalance);
            return getBalanceSuccessAction({ currentBalance: currentBalance });
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private billService: BillService) {}
}
