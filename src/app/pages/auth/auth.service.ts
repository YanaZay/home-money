import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { IRegisterRequest } from '../../shared/types/register-request.interface';
import { ICurrentUser } from '../../shared/types/current-user.interface';
import { ILoginRequest } from '../../shared/types/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  public register(data: IRegisterRequest): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>('/users', data);
  }

  public login(data: ILoginRequest): Observable<ICurrentUser[]> {
    return this.http.get<ICurrentUser[]>(`/users?email=${data.email}`);
  }

  public getCurrentUser(): Observable<ICurrentUser> {
    const currentUser: ICurrentUser = JSON.parse(
      <string>localStorage.getItem('user')
    );
    console.log(currentUser);
    return of(currentUser);
  }

  public checkUser(email: string): Observable<ICurrentUser[]> {
    return this.http.get<ICurrentUser[]>(`/users?email=${email}`);
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
