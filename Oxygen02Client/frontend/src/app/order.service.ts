import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private OrderServiceUrl = 'http://localhost:3000/app/order-service';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.OrderServiceUrl);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.OrderServiceUrl}/${id}`);
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.OrderServiceUrl, orderData);
  }

  addOrder(newOrder: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  updateOrder(id: string, orderData: any): Observable<any> {
    return this.http.patch<any>(`${this.OrderServiceUrl}/${id}`, orderData);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.OrderServiceUrl}/${id}`);
  }
}
