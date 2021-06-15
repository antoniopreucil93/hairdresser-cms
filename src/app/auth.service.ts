import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, public http: HttpClient) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken') || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(username: string, password: string) {
    return this.http
      .post<any>(`${baseUrl}auth/admin/login`, { username, password })
      .toPromise();
  }
  public getRole() {
    return localStorage.getItem('role');
  }
}
