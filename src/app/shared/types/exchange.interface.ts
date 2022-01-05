export interface IExchangeInterface {
  base: string;
  date: string;
  rates: any;
  success: boolean;
  timestamp: number;
}

export interface ICurrentExchangeInterface {
  date: string;
  currency: string;
  rates: number;
}
