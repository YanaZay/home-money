import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { IEvents } from '../../shared/models/events.interface';
import { ICategories } from '../../shared/models/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  public changeHistoryTitle: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  public getEvents(): Observable<IEvents[]> {
    return this.http.get<IEvents[]>('/events');
  }

  public getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>('/categories');
  }
}
