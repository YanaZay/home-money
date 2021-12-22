import { createAction, props } from "@ngrx/store";

import { IUser } from "../../../../shared/models/userResponse.interface";

export const registerAction = createAction(
  '[Auth] Register',
  props<{ user: IUser }>()
)
