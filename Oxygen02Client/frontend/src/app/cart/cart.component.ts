import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import AuthService
import { CartService } from '../cart.service'; // Import CartService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  products: any[] = [];
  newProduct: any = {};
  updatedProduct: any = {};
  selectedProduct: any = {};

  constructor(private http: HttpClient, 
              private authService: AuthService,
              private cartService: CartService) { } // Inject AuthService and CartService

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('/app/products').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct() {
    if (this.authService.isAuthenticated()) {
      // Logic to add product to cart using CartService
      
      this.cartService.addProductToCart(this.newProduct).subscribe(
        (response) => {
          // Product added successfully, do something if needed
          console.log('Product added to cart:', response);
          // Assuming you want to clear the form after adding the product
          this.newProduct = {};
        },
        (error) => {
          console.error('Error adding product to cart:', error);
        }
      );
    } else {
      alert('You need to be logged in to add products to your cart.');
    }
  }

  updateProduct() {
    this.http.patch(`/app/products/${this.selectedProduct._id}`, this.updatedProduct).subscribe(
      (response) => {
        this.updatedProduct = {};
        this.fetchProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  deleteProduct(productId: string) {
    this.http.delete(`/app/products/${productId}`).subscribe(
      (response) => {
        this.fetchProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
  checkout() {
    // Call the submitOrder method of the CartService to submit the order
    this.cartService.submitOrder(this.cartItems).subscribe(
      (response: any) => {
        // Handle successful order submission (if needed)
        console.log('Order submitted successfully:', response);
      },
      (error: any) => {
        // Handle error in order submission (if needed)
        console.error('Error submitting order:', error);
      }
    );
  }
  

  selectProduct(product: any) {
    this.selectedProduct = product;
  }
}

