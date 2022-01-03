import { createReducer, on } from '@ngrx/store';

import { getBalanceAction } from './actions/balance.action';
import any = jasmine.any;

const initialState: { currentBalance: any } = {
  currentBalance: null,
};

export const billReducer = createReducer(
  initialState,
  on(getBalanceAction, (state): any => ({
    ...state,
    currentBalance: state.currentBalance,
  }))
);
