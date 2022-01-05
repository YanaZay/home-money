import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import {
  getBalanceSuccessAction,
  getBalanceAction,
} from '../actions/get-balance.action';
import { BillService } from '../../bill.service';
import { ICurrentBalance } from '../../../../shared/types/current-balance.interface';

@Injectable()
export class GetBalanceEffect {
  public getBalance$ = createEffect(() =>
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
