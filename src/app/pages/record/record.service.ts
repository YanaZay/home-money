import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategories } from '../../shared/models/categories.interface';
import { environment } from '../../../environments/environment';
import { IEvents } from '../../shared/models/events.interface';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private http: HttpClient) {}

  public deleteCategory(id: number): Observable<{}> {
    return this.http.delete<ICategories[]>(`${environment.apiHost}/categories/${id}`);
  }

  public addNewEvent(event: IEvents): Observable<{}> {
    return this.http.post<IEvents>(`${environment.apiHost}/events`, event);
  }

  public addNewCategory(category: ICategories): Observable<{}> {
    return this.http.post<ICategories>(`${environment.apiHost}/categories`, category);
  }

  public editCategory(id: number, body: {name: string, capacity: number}): Observable<{}> {
    return this.http.put<ICategories>(`${environment.apiHost}/categories/${id}`, body);
  }
}
