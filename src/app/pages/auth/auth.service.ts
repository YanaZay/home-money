import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user.interface';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiHost}`+'/users', user);
  }

  public checkUser(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiHost}/users?email=${email}`);
  }
}
