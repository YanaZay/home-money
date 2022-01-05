import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from '../../../shared/types/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<IAuthState>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser
);
