import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  remove(title: string): void {
    this.productsService.remove(title)
    .subscribe(() => {
      this.getProducts();
    })
  }

  update(product: ProductModel){
    this.productsService.update(product)
    .subscribe(products => {
      this.products = products;
    })
  }

  private getProducts(){
    this.productsService.getProducts()
    .subscribe(products => {
      this.products = products;
    })
  }

}
