import { createAction, props } from '@ngrx/store';

import { IRegisterRequest } from '../../../../shared/types/register-request.interface';
import { ICurrentUser } from '../../../../shared/types/current-user.interface';
import { IBackendErrors } from '../../../../shared/types/backend-errors.interface';

export const registerAction = createAction(
  '[Auth] Register',
  props<{ request: IRegisterRequest }>()
);

export const registerSuccessAction = createAction(
  '[Auth] Register success',
  props<{ currentUser: ICurrentUser }>()
);

export const registerFailureAction = createAction(
  '[Auth] Register failure',
  props<{ errors: IBackendErrors }>()
);
