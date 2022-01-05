import { createAction, props } from '@ngrx/store';
import { ICurrentBalance } from '../../../../shared/types/current-balance.interface';

export const getBalanceAction = createAction('[Bill] Get balance');

export const getBalanceSuccessAction = createAction(
  '[Bill] Get balance success',
  props<{ currentBalance: ICurrentBalance }>()
);

export const getBalanceFailureAction = createAction(
  '[Bill] Get balance failure'
);
