import { createAction, props } from '@ngrx/store';
import { ICurrentBalance } from '../../../../shared/models/current-balance.interface';

export const getBalanceAction = createAction('[Bill] Bill get balance');

export const currentBalanceAction = createAction(
  '[Bill] Bill current balance',
  props<{ currentBalance: ICurrentBalance }>()
);
