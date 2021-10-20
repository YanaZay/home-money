import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthState: boolean = false;
  public users: string = 'users';

  constructor(private http: HttpClient) { }

  public addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiHost}${this.users}`, user);
  }

  public checkUser(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiHost}/users?email=${email}`);
  }

  public login(value: boolean): void {
    this.isAuthState = value;
  }

  public isAuthenticated(): boolean {
    return (this.isAuthState);
  }

  public getExchangeRates(): Observable<any> {
    return this.http.get(`${environment.exchangeRates}`);
  }
}
