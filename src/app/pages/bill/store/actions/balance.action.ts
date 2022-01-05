import { createAction, props } from '@ngrx/store';
import { ICurrentBalance } from '../../../../shared/types/current-balance.interface';

export const getBalanceAction = createAction('[Bill] Bill get balance');

export const getBalanceSuccessAction = createAction(
  '[Bill] Bill get balance success',
  props<{ currentBalance: ICurrentBalance }>()
);

export const getBalanceFailureAction = createAction(
  '[Bill] Bill get balance failure'
);
