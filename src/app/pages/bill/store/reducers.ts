import { createReducer, on } from '@ngrx/store';

import {
  getBalanceSuccessAction,
  getBalanceAction,
  getBalanceFailureAction,
} from './actions/get-balance.action';
import { IBillState } from '../types/bill-state.interface';
import {
  getExchangeRatesAction,
  getExchangeRatesFailureAction,
  getExchangeRatesSuccessAction,
} from './actions/get-exchange-rates.action';

const initialState: IBillState = {
  currentBalance: null,
  exchangeRates: null,
  isLoading: false,
  error: null,
};

export const billReducer = createReducer(
  initialState,
  on(
    getBalanceAction,
    (state): IBillState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getBalanceSuccessAction,
    (state, action): IBillState => ({
      ...state,
      isLoading: false,
      currentBalance: action.currentBalance,
    })
  ),
  on(
    getBalanceFailureAction,
    (state): IBillState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getExchangeRatesAction,
    (state): IBillState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getExchangeRatesSuccessAction,
    (state, action): IBillState => ({
      ...state,
      isLoading: false,
      exchangeRates: action.exchangeRates,
    })
  ),
  on(
    getExchangeRatesFailureAction,
    (state): IBillState => ({
      ...state,
      isLoading: true,
    })
  )
);
