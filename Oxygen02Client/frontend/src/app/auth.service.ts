import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user = {
      role: 'admin' // Assuming you have a 'role' property indicating the user's role
    };
  
  // Method to check if the user is an admin
    isAdmin(): boolean {
      // Check if the user role is 'admin'
      return this.user.role === 'admin';
    }
  
    isCustomer(): boolean {
      // Check if the user role is 'customer'
        return this.user.role === 'customer';
    //}
    //throw new Error('Method not implemented.');
  }
  
  static isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/app/login', { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:4200/app/signup', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

}

function isCustomer() {
  throw new Error('Function not implemented.');
}

/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:4200/app/login', { username, password }, { withCredentials: true }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:4200/app/signup', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
*/

