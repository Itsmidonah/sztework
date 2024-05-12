import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  newProduct: any = {};
  selectedProduct: any = {};

  constructor(private http: HttpClient, 
    private authService: AuthService,
    private productService: ProductService) { }


  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      (response: any) => {
        this.newProduct = {};
        this.fetchProducts();
      },
      (error: any) => {
        console.error('Error adding product:', error);
      }
    );
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      (response: any) => {
        this.fetchProducts();
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
  }
}
