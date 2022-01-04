import { createReducer, on } from '@ngrx/store';

import { getBalanceAction } from './actions/balance.action';
import { IBillState } from '../types/bill-state.interface';

const initialState: IBillState = {
  currentBalance: null,
};

export const billReducer = createReducer(
  initialState,
  on(getBalanceAction, (state): any => ({
    ...state,
    currentBalance: state.currentBalance,
  }))
);
