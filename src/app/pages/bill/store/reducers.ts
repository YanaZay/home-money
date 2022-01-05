import { createReducer, on } from '@ngrx/store';

import {
  getBalanceSuccessAction,
  getBalanceAction,
  getBalanceFailureAction,
} from './actions/balance.action';
import { IBillState } from '../types/bill-state.interface';

const initialState: IBillState = {
  currentBalance: null,
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
  )
);
