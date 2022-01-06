import { createAction, props } from '@ngrx/store';

import { IRegisterRequest } from '../../../../shared/types/registerRequest.interface';
import { ICurrentUser } from '../../../../shared/types/currentUser.interface';
import { IBackendErrors } from '../../../../shared/types/backendErrors.interface';

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
