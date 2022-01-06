import { createAction, props } from '@ngrx/store';
import { IEvents } from '../../../../shared/types/events.interface';

export const getEventsAction = createAction('[History] Get events');

export const getEventSuccessAction = createAction(
  '[History] Get events success',
  props<{ events: IEvents[] }>()
);

export const getEventsFailureAction = createAction(
  '[History] Get events failure'
);
