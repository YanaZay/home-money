import { createReducer, on } from "@ngrx/store";

import { IAuthState } from "../../../shared/models/authState.interface";
import { registerAction } from "./actions/register.action";

const initialState: IAuthState = {
  isSubmitting: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true
    })
  )
)
