import { createAction, props } from "@ngrx/store";

import { IUserRequest } from "../../../../shared/models/userRequest.interface";
import { IUserResponse } from "../../../../shared/models/userResponse.interface";

export const registerAction = createAction(
  '[Auth] Register',
  props<{ request: IUserRequest }>()
)

export const registerSuccessAction = createAction(
  '[Auth] Register success',
  props<{ currentUser: IUserResponse }>()
)

export const registerFailureAction = createAction(
  '[Auth] Register failure',
)
