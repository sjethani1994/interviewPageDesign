// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service.service';
import { Product } from './product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.error = 'Error loading products. Please try again later.';
      }
    );
  }

  addToCart(product: Product) {
    // Assuming you have a cartItems array in this component to store selected products
    // You can add the selected product to the cartItems array
    // For a complete cart functionality, it's recommended to use a CartService
    const selectedProduct: Product = { ...product }; // Clone the product to avoid reference issues
    // Add the selected product to the cartItems array (you need to define cartItems)
    // For example:
    // this.cartItems.push(selectedProduct);
  }
}
