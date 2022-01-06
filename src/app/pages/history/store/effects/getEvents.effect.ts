import { Injectable } from '@angular/core';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HistoryService } from '../../history.service';
import {
  getEventsAction,
  getEventsFailureAction,
  getEventSuccessAction,
} from '../actions/getEvents.action';
import { IEvents } from '../../../../shared/types/events.interface';

@Injectable()
export class GetEventsEffect {
  public getEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getEventsAction),
      switchMap(() => {
        return this.historyService.getEvents().pipe(
          map((events: IEvents[]) => {
            return getEventSuccessAction({ events });
          }),
          catchError(() => {
            return of(getEventsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private historyService: HistoryService
  ) {}
}
