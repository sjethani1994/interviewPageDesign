// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart-service.service';
import { CartItem } from './cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

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
}
