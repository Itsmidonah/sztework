import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SignupService } from '../signup.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,  
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      address: [''],
      nickname: [''],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  signup() {
    if (this.signupForm.valid) {
      // Perform signup logic here
      console.log('Form submitted successfully');
    } else {
      // Form is invalid
      console.log('Form is invalid');
    }
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    
    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value === confirmPasswordControl.value) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ mustMatch: true });
      }
    }
  }

  goBack() {
    console.log('Going back...');
    this.router.navigate(['back']);
  }
}
