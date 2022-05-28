import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  titleCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]);
  priceCtrl = new FormControl('', [Validators.required]);
  amountCtrl = new FormControl('', [Validators.required]);

  productTitle: any;

  productForm: FormGroup = new FormGroup({
    title: this.titleCtrl,
    price: this.priceCtrl,
    amount: this.amountCtrl,
  });

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

  fillForm(product: ProductModel){
    this.titleCtrl.disable();
    this.productTitle = product.title;
    this.titleCtrl.setValue(product.title);
    this.priceCtrl.setValue(product.price);
    this.amountCtrl.setValue(product.amount);
  }

  private create(product: ProductModel){
    this.productsService.create(product)
    .subscribe(products => {
      this.products = products;
      this.productForm.reset();
    })
  }

  private update(product: ProductModel){
    this.productsService.update(product)
    .subscribe(products => {
      this.products = products;
      this.productForm.reset();
      this.productTitle = null;
      this.titleCtrl.enable();
    })
  }

  submit(){
    const value = this.productForm.value;
    if(this.productTitle){
      this.update({title: this.productTitle, ...value});
    } else {
      this.create(value);
    }
  }

  private getProducts(){
    this.productsService.getProducts()
    .subscribe(products => {
      this.products = products;
    })
  }

}
