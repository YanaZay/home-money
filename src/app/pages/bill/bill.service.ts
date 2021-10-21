import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import {IExchangeInterface} from "../../shared/models/exchange.interface";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }


  public getExchangeRates(): Observable<IExchangeInterface> {
    return this.http.get<IExchangeInterface>(`${environment.exchangeRates}`)
  }

}
