import { createAction, props } from '@ngrx/store';

import { ILoginRequest } from '../../../../shared/models/loginRequest.interface';
import { ICurrentUser } from '../../../../shared/models/currentUser.interface';
import { IBackendErrors } from '../../../../shared/models/backendErrors.interface';

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
