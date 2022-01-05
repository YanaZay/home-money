import { ICurrentBalance } from '../../../shared/types/current-balance.interface';
import { IExchangeInterface } from '../../../shared/types/exchange.interface';

export interface IBillState {
  currentBalance: ICurrentBalance | null;
  error: string | null;
  isLoading: boolean;
  exchangeRates: IExchangeInterface | null;
}
