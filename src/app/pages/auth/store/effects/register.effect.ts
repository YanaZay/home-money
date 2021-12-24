import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError } from "rxjs/operators";
import { of } from 'rxjs';

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction} from "../actions/register.action";
import { AuthService } from "../../auth.service";
import { IUserResponse } from "../../../../shared/models/userResponse.interface";

@Injectable()
export class RegisterEffect {

  private register$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(registerAction),
        switchMap(
          ({request}) => {
            return this.AuthService.register(request)
              .pipe(
                map((currentUser: IUserResponse) => {
                  return registerSuccessAction({currentUser})
                }),
                catchError(() => {
                  return of(registerFailureAction)
                })
              )
          }
        )
      )
  )

  constructor(
    private actions$: Actions,
    private AuthService: AuthService
  ) {}
}
