import { IAuthState } from './auth-state.interface';
import { IBillState } from '../../pages/bill/types/bill-state.interface';

export interface IAppState {
  auth: IAuthState;
  bill: IBillState;
}
