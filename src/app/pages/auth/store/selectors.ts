import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from '../../../shared/types/authState.interface';

export const authFeatureSelector = createFeatureSelector<IAuthState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.validationErrors
);
