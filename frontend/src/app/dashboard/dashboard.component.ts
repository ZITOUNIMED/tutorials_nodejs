import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;

  options= {
    responsive: true,
    maintainAspectRatio: false
  }

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe(products => {
      this.buildProductsChart(products)
    })
  }

  private buildProductsChart(products: ProductModel[]){
    this.data = {
      labels: [] as string[],
      datasets: [] as any[]
    };
    const priceData = {
      label: 'Amout',
      data: [] as number[],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(234, 45, 122, 0.2)',
        'rgba(122, 32, 211, 0.2)',
        'rgba(43, 333, 234, 0.2)',
        'rgba(54, 54, 222, 0.2)'
      ]
    };

    products.forEach(product => {
      this.data.labels.push(product.title);
      priceData.data.push(product.amount)
    });

    this.data.datasets.push(priceData);
  }
}
