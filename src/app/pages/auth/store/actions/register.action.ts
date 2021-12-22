import { createAction, props } from "@ngrx/store";

import { IUser } from "../../../../shared/models/user.interface";

export const registerAction = createAction(
  '[Auth] Register',
  props<{ user: IUser }>()
)
