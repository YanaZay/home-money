import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IEvents } from '../../shared/models/events.interface';
import { ICategories } from '../../shared/models/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
    private http: HttpClient
  ) {}

  public getEvents(): Observable<IEvents[]> {
    return this.http.get<IEvents[]>(`${environment.apiHost}/events`);
  }

  public getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(`${environment.apiHost}/categories`);
  }
}
