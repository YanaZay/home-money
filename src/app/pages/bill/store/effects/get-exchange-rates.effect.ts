import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { BillService } from '../../bill.service';
import {
  getExchangeRatesAction,
  getExchangeRatesFailureAction,
  getExchangeRatesSuccessAction,
} from '../actions/get-exchange-rates.action';
import { IExchangeInterface } from '../../../../shared/types/exchange.interface';

@Injectable()
export class GetExchangeRatesEffect {
  public getExchangeRates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getExchangeRatesAction),
      switchMap(() => {
        return this.billService.getExchangeRates().pipe(
          map((exchangeRates: IExchangeInterface) => {
            return getExchangeRatesSuccessAction({ exchangeRates });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getExchangeRatesFailureAction);
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private billService: BillService
  ) {}
}
