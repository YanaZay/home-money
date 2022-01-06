import { IEvents } from './events.interface';

export interface IHistoryState {
  isLoading: boolean;
  error: string | null;
  data: IEvents[] | null;
}
