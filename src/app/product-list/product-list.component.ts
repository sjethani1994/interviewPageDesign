// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service.service';
import { Product } from './product.interface';
import { CartService } from '../service/cart-service.service';
import { Router } from '@angular/router';
import { CartItem } from '../cart-component/cart-item.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  error: string = '';
  public selectedProducts: Product[] = [];
  public selectedProductIds: number[] = [];
  public cartItems: CartItem[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        this.error = 'Error loading products. Please try again later.';
      }
    );
  }

  addToCart(product: Product) {
    // Create a copy of the product
    const selectedProduct: Product = { ...product };

    if (!this.selectedProductIds.includes(product.id)) {
      this.selectedProductIds.push(product.id);
    }

    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    // Remove the product's id from the selectedProductIds array
    const index = this.selectedProductIds.indexOf(product.id);
    if (index !== -1) {
      this.selectedProductIds.splice(index, 1);
    }

    const cartItem: CartItem = {
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      quantity: 0,
    }
    this.cartItems.push(cartItem);
    // Remove the product from the cart using your cart service
    this.cartService.removeFromCart(cartItem);
  }

  redirectToCart() {
    // Redirect to the cart page
    this.router.navigate(['/cart']);
  }
}
