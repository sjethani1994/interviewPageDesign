// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart-service.service';
import { CartItem } from './cart-item.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  incrementQuantity(item: CartItem) {
    this.cartService.incrementQuantity(item);
  }

  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
  }

  getTotalCartValue() {
    return this.cartService.getTotalCartValue();
  }

  redirectToProducts() {
    // Redirect to the products page
    this.router.navigate(['/products']);
  }
}
