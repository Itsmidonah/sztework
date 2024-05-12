import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ProductServiceUrl = 'http://localhost:3000/app/product-service';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.ProductServiceUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.ProductServiceUrl}/${id}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.ProductServiceUrl, productData);
  }

  addProduct(newProduct: any):Observable<any> {
    throw new Error('Method not implemented.');
  }

  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.patch<any>(`${this.ProductServiceUrl}/${id}`, productData);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.ProductServiceUrl}/${id}`);
  }
}
