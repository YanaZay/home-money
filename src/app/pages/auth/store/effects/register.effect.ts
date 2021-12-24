import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../actions/register.action';
import { AuthService } from '../../auth.service';
import { ICurrentUser } from '../../../../shared/models/currentUser.interface';

@Injectable()
export class RegisterEffect {
  private register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.AuthService.register(request).pipe(
          map((currentUser: ICurrentUser) => {
            return registerSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    )
  );

  private redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.router.navigate(['/login'], { queryParams: { done: true } });
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
