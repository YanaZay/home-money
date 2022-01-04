import { createReducer, on } from '@ngrx/store';

import {
  currentBalanceAction,
  getBalanceAction,
} from './actions/balance.action';
import { IBillState } from '../types/bill-state.interface';

const initialState: IBillState = {
  currentBalance: null,
};

export const billReducer = createReducer(
  initialState,
  on(
    getBalanceAction,
    (state): IBillState => ({
      ...state,
      currentBalance: null,
    })
  ),
  on(
    currentBalanceAction,
    (state, action): IBillState => ({
      ...state,
      currentBalance: action.currentBalance,
    })
  )
);
