import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBillState } from '../types/bill-state.interface';

export const billFeatureSelector = createFeatureSelector<IBillState>('bill');

export const isLoadingSelector = createSelector(
  billFeatureSelector,
  (billState: IBillState) => billState.isLoading
);

export const errorSelector = createSelector(
  billFeatureSelector,
  (billState: IBillState) => billState.error
);

export const currentBalanceSelector = createSelector(
  billFeatureSelector,
  (billState: IBillState) => billState.currentBalance
);

export const exchangeRatesSelector = createSelector(
  billFeatureSelector,
  (billState: IBillState) => billState.exchangeRates
);
