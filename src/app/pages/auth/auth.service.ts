import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IRegisterRequest } from '../../shared/models/registerRequest.interface';
import { ICurrentUser } from '../../shared/models/currentUser.interface';
import { ILoginRequest } from '../../shared/models/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public register(data: IRegisterRequest): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${environment.apiHost}/users`, data);
  }

  public login(data: ILoginRequest): Observable<ICurrentUser[]> {
    return this.http.get<ICurrentUser[]>(
      `${environment.apiHost}/users?email=${data.email}`
    );
  }

  public checkUser(email: string): Observable<ICurrentUser[]> {
    return this.http.get<ICurrentUser[]>(
      `${environment.apiHost}/users?email=${email}`
    );
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
