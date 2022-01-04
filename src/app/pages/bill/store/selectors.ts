import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBillState } from '../types/bill-state.interface';

export const billFeatureSelector = createFeatureSelector<IBillState>('bill');

export const currentBalanceSelector = createSelector(
  billFeatureSelector,
  (billState: IBillState) => billState.currentBalance
)
