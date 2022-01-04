import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IExchangeInterface } from '../../shared/models/exchange.interface';
import { ICurrentBalance } from '../../shared/models/current-balance.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient) {}

  public getBalance(): Observable<ICurrentBalance> {
    return this.http.get<ICurrentBalance>(`${environment.apiHost}/bill`);
  }
  //TODO check interceptor

  public getExchangeRates(): Observable<IExchangeInterface> {
    return this.http.get<IExchangeInterface>(`${environment.apiHost}/currency`);
  }
}
