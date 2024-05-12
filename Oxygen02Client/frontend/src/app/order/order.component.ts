/*import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  //orders: Observable<any[]> | undefined;
  newOrder: any = {};
  selectedOrder: any = {};
 
  constructor(private http: HttpClient, 
    private authService: AuthService,
    private orderService: OrderService) { }

  //constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getOrders().subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error: any) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  /*addOrder() {
    this.orderService.addOrder(this.newOrder).subscribe(
      (response: any) => {
        this.newOrder = {};
        this.fetchOrders();
      },
      (error: any) => {
        console.error('Error adding order:', error);
      }
    );
  }*/

  /*deleteOrder(orderId: string) {
    this.orderService.deleteOrder(orderId).subscribe(
      (response: any) => {
        this.fetchOrders();
      },
      (error: any) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  selectOrder(order: any) {
    this.selectedOrder = order;
  }
}*/
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
 orders: any[] = [];

  

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.orders = this.cartService.getCartItems();
  }

  deleteOrder(index: number) {
    // Remove the order from the orders array based on its index
    if (index >= 0 && index < this.orders.length) {
      this.orders.splice(index, 1);
    }
  }
}
