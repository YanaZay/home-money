import { createReducer, on } from '@ngrx/store';

import { IHistoryState } from '../../../shared/types/historyState.interface';
import {
  getEventsAction,
  getEventsFailureAction,
  getEventSuccessAction,
} from './actions/getEvents.action';

const initialState: IHistoryState = {
  isLoading: false,
  data: null,
  error: null,
};

export const historyReducer = createReducer(
  initialState,
  on(
    getEventsAction,
    (state): IHistoryState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getEventSuccessAction,
    (state, action): IHistoryState => ({
      ...state,
      isLoading: false,
      data: action.events,
    })
  ),
  on(
    getEventsFailureAction,
    (state): IHistoryState => ({
      ...state,
      isLoading: false,
    })
  )
);
