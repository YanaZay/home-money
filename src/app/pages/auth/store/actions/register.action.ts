import { createAction, props } from "@ngrx/store";

import { IUserRequest } from "../../../../shared/models/userRequest.interface";

export const registerAction = createAction(
  '[Auth] Register',
  props<{ user: IUserRequest }>()
)
