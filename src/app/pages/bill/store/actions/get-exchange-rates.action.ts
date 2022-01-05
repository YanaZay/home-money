import { createAction, props } from '@ngrx/store';
import { IExchangeInterface } from '../../../../shared/types/exchange.interface';

export const getExchangeRatesAction = createAction('[Bill] Get exchange rates');

export const getExchangeRatesSuccessAction = createAction(
  '[Bill] Get exchange rates success',
  props<{ exchangeRates: IExchangeInterface }>()
);

export const getExchangeRatesFailureAction = createAction(
  '[Bill] Get exchange rates failure'
);
