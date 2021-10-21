import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IUser } from '../../shared/models/user.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiHost}/users`, user);
  }


  public checkUser(email: string): Observable<IUser[]> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    const requestOptions = {
      headers: new Headers(headerDict),
    };
    return this.http.get<IUser[]>(`${environment.apiHost}/users?email=${email}`);
  }

  public login(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
