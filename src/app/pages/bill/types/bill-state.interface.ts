import { ICurrentBalance } from '../../../shared/types/current-balance.interface';

export interface IBillState {
  currentBalance: ICurrentBalance | null;
  error: string | null;
  isLoading: boolean;
}
