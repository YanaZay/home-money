import { ICurrentBalance } from '../../../shared/models/current-balance.interface';

export interface IBillState {
  currentBalance: ICurrentBalance | null;
}
