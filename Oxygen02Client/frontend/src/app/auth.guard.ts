import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

//import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs';
  
@Injectable({
  providedIn: 'root'
})
export class authGuard {
  private loggedInUser: any = null;

  constructor(private authService: AuthService, private router: Router) {}
//constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Simulate user authentication
    if (username === 'admin' && password === 'admin') {
      // For simplicity, assuming admin user can access all functionalities
      this.loggedInUser = { username: username, role: 'admin' };
    } else if (username === 'customer' && password === 'customer') {
      // For simplicity, assuming registered users are customers
      this.loggedInUser = { username: username, role: 'customer' };
    } else if (username === 'guest' && password === 'guest') {
      // For simplicity, assuming guest users have limited access
      this.loggedInUser = { username: username, role: 'guest' };
    } else {
      return false; // Login failed
    }
    return true; // Login successful
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  isAdmin(): boolean {
    return this.loggedInUser?.role === 'admin';
  }

  isCustomer(): boolean {
    return this.loggedInUser?.role === 'customer';
  }

  isGuest(): boolean {
    return this.loggedInUser?.role === 'guest';
  }

  checkAuth(): Observable<boolean> {
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return of(false);
    }
    return of(true);
  }

  logout(): void {
    this.loggedInUser = null;
  }
}
