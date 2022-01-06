import { createAction, props } from '@ngrx/store';

import { ILoginRequest } from '../../../../shared/types/loginRequest.interface';
import { ICurrentUser } from '../../../../shared/types/currentUser.interface';
import { IBackendErrors } from '../../../../shared/types/backendErrors.interface';

export const loginAction = createAction(
  '[Auth] Login',
  props<{ request: ILoginRequest }>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login success',
  props<{ currentUser: ICurrentUser }>()
);

export const loginFailureAction = createAction(
  '[Auth] Login failure',
  props<{ errors: IBackendErrors }>()
);
