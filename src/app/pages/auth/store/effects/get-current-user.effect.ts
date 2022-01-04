import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../../auth.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/get-current-user.action';
import { ICurrentUser } from '../../../../shared/models/current-user.interface';

@Injectable()
export class GetCurrentUserEffect {
  public getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        // const token = JSON.parse(<string>localStorage.getItem('user'));
        // console.log(token);
        // if (!token) {
        //   return of(getCurrentUserFailureAction);
        // }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            console.log(currentUser);
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getCurrentUserFailureAction);
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}