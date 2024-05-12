import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CartServiceUrl = 'http://localhost:3000/app/cart-service';

  constructor(private http: HttpClient) { }

  getCarts(): Observable<any[]> {
    return this.http.get<any[]>(this.CartServiceUrl);
  }

  getCartById(id: string): Observable<any> {
    return this.http.get<any>(`${this.CartServiceUrl}/${id}`);
  }

  createCart(cartData: any): Observable<any> {
    return this.http.post<any>(this.CartServiceUrl, cartData);
  }

  updateCart(id: string, cartData: any): Observable<any> {
    return this.http.patch<any>(`${this.CartServiceUrl}/${id}`, cartData);
  }

  deleteCart(id: string): Observable<any> {
    return this.http.delete<any>(`${this.CartServiceUrl}/${id}`);
  }
  
  addProductToCart(productId: string): Observable<any> {
    // Assuming you have an API endpoint to add a product to the cart
    return this.http.post<any>(`${this.CartServiceUrl}/add-product`, { productId });
  }

  submitOrder(cartItems: any[]): Observable<any> {
    // Assuming you have an API endpoint to submit orders
    return this.http.post<any>('http://localhost:3000/app/submit-order', cartItems);
  }
  // Define the getCartItems method
  getCartItems(): any[] {
    // Implementation to retrieve cart items
    return []; // Replace this with your actual implementation
  }
}
