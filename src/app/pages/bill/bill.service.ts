import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IExchangeInterface } from '../../shared/types/exchange.interface';
import { ICurrentBalance } from '../../shared/types/current-balance.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBalance(): Observable<ICurrentBalance> {
    return this.http.get<ICurrentBalance>('/bill');
  }
  //TODO check interceptor

  public getExchangeRates(): Observable<IExchangeInterface> {
    return this.http.get<IExchangeInterface>('/currency');
  }
}
