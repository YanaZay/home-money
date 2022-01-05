import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategories } from '../../shared/types/categories.interface';
import { IEvents } from '../../shared/types/events.interface';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(private http: HttpClient) {}

  public deleteCategory(id: number): Observable<{}> {
    return this.http.delete<ICategories[]>(`/categories/${id}`);
  }

  public addNewEvent(event: IEvents): Observable<{}> {
    return this.http.post<IEvents>('/events', event);
  }

  public addNewCategory(category: ICategories): Observable<{}> {
    return this.http.post<ICategories>('/categories', category);
  }

  public editCategory(
    id: number,
    body: { name: string; capacity: number }
  ): Observable<{}> {
    return this.http.put<ICategories>(`/categories/${id}`, body);
  }
}
