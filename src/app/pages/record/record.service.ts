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

  constructor(
    private http: HttpClient
  ) {}

  public deleteCategory(id: number): Observable<{}> {
    return this.http.delete<ICategories[]>(`${environment.apiHost}/categories/${id}`);
  }

  public addNewEvent(event: IEvents): Observable<{}> {
    return this.http.post<IEvents>(`${environment.apiHost}/events`, event)
  }
}

// {
//   "name": "Home",
//   "capacity": 10000,
//   "id": 1
// },
// {
//   "name": "Products",
//   "capacity": 10000,
//   "id": 2
// },
// {
//   "id": 3,
//   "name": "Car",
//   "capacity": 7000
// },
// {
//   "id": 4,
//   "name": "Healthy",
//   "capacity": 7000
// }
