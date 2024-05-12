import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private LoginServiceUrl = 'http://localhost:3000/app/login-service';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.LoginServiceUrl}/login`, { username, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message || 'Server error');
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.LoginServiceUrl}/logout`, {});
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.LoginServiceUrl}/isAuthenticated`);
  }
}
