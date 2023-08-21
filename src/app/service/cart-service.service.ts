// cart.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
      };
      this.cartItems.push(newItem);
    }
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(
      (i) => i.product.id === item.product.id
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++;
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotalCartValue(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}
