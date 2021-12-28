import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '../../auth.service';
import { ICurrentUser } from '../../../../shared/models/currentUser.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/login.action';

@Injectable()
export class LoginEffect {
  private login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.AuthService.login(request).pipe(
          map((currentUserArray: ICurrentUser[]) => {
            const currentUser = currentUserArray[0];
            localStorage.setItem('user', JSON.stringify(currentUser));
            return loginSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  private redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigate(['/page']);
        })
      ),
    { dispatch: false }
  );
  //если используем tap, и не возвращаем action - { dispatch: false }, чтобы не было memory leak

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router
  ) {}
}
