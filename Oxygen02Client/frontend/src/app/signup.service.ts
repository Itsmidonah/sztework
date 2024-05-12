import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private SignupServiceUrl = 'http://localhost:3000/app/signup-service';

  constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(this.SignupServiceUrl, userData);
  }
}