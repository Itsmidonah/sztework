import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { CanActivateFn, Router } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to products by default
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then((c) => c.CartComponent) },
  { path: 'user', loadComponent: () => import('./user/user.component').then((c) => c.UserComponent), canActivate: [authGuard] },
  { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
  { path: 'product', loadComponent: () => import('./product/product.component').then((c) => c.ProductComponent) },
  { path: 'order', loadComponent: () => import('./order/order.component').then((c) => c.OrderComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
  { path: '**', redirectTo: '/login' } // Redirect to products if route not found
];