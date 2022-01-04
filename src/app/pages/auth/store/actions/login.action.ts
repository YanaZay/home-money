import { createAction, props } from '@ngrx/store';

import { ILoginRequest } from '../../../../shared/models/login-request.interface';
import { ICurrentUser } from '../../../../shared/models/current-user.interface';
import { IBackendErrors } from '../../../../shared/models/backend-errors.interface';

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
