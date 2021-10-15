import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public postUser(object: IUser): void {
    this.http.post(`${environment.apiHost}/user`, object);
  }

  public getUser(): void {

  }
}
