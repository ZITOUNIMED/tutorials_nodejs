import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = environment.api_url + '/product';

  constructor(private http: HttpClient) { }

  remove(title: string): Observable<any> {
    return this.http.delete(this.url + `/${title}`);
  }

  create(product: ProductModel): Observable<any> {
    return this.http.post(this.url, product);
  }

  update(product: ProductModel): Observable<any> {
    return this.http.put(this.url, product);
  }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url);
  }
}
