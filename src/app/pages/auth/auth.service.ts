import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IUserRequest } from "../../shared/models/userRequest.interface";
import { IUserResponse } from "../../shared/models/userResponse.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public addUser(user: IUserResponse): Observable<IUserRequest> {
    return this.http.post<IUserRequest>(`${ environment.apiHost }/users`, user);
  }

  public checkUser(email: string): Observable<IUserResponse[]> {
    return this.http.get<IUserResponse[]>(`${ environment.apiHost }/users?email=${ email }`);
  }

  public login(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
