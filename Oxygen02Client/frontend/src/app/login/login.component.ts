import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to navigate to other pages
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
submitForm() {
throw new Error('Method not implemented.');
}
  username: string = '';
  password: string = '';
  error: string | null = null;
  confirmPassword: any;

  constructor(private authService: AuthService, 
    private loginService: LoginService, 
    private http: HttpClient, 
    private router: Router) {}

    login(): void {
      if (!this.authService.isAuthenticated()) {
        // Prompt guest to sign up
        alert('You need to sign up before you can log in.');
        // Redirect to sign up page
        this.router.navigate(['/signup']);
        return; // Exit login function to prevent further execution
      }
  
      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          // Assuming response contains user authentication details or token
          if (response.success) {
            // Redirect to the dashboard or desired page upon successful login
            this.router.navigate(['/dashboard']);
          } else {
            // Handle authentication failure
            this.error = response.message || 'Invalid username or password';
          }
        },
        (error) => {
          // Handle HTTP request error
          this.error = error.message || 'An error occurred';
        }
      );
    }
    /*login(): void {
      this.loginService.login(this.username, this.password).subscribe(
        (response) => {
          // Assuming response contains user authentication details or token
          if (response.success) {
            if (this.authService.isAdmin && this.authService.isAdmin()) {
              this.router.navigate(['/admin-dashboard']);
            } else if (this.authService.isCustomer && this.authService.isCustomer()) {
              this.router.navigate(['/customer-dashboard']);
            }
          } else {
            this.error = response.message || 'Invalid username or password';
          }
        },
        (error) => {
          this.error = error;
        }
      );
    }*/
    
  
    signup(): void {
      this.router.navigate(['/signup']);
    }
  }
  

 /*login(): void {
    if (this.authService.login(this.username, this.password)) {
      // Redirect based on user role after successful login
      if (this.authService.isAdmin()!) {
        // Redirect admin to admin dashboard
        this.router.navigate(['/admin-dashboard']);
      } else if (this.authService.isCustomer()!) {
        // Redirect customer to customer dashboard or product page
        this.router.navigate(['/customer-dashboard']);
      }
    } else {
      this.error = 'Invalid username or password';
    }
  }

  signup(): void {
    // Navigate to the signup page
    this.router.navigate(['/signup']);
  }
}*/
