import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private UserServiceUrl = 'http://localhost:3000/app/user-service';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.UserServiceUrl);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.UserServiceUrl}/${id}`);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(this.UserServiceUrl, userData);
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.patch<any>(`${this.UserServiceUrl}/${id}`, userData);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.UserServiceUrl}/${id}`);
  }
}
