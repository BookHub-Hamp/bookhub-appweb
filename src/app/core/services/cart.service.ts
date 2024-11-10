import { Injectable } from '@angular/core';
import { PurchaseItemCreateUpdateRequest } from '../../shared/models/purchase-create-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';

  constructor() {}

  getCartItems(): PurchaseItemCreateUpdateRequest[] {
    const items = localStorage.getItem(this.cartKey);
    return items ? JSON.parse(items) : [];
  }

  addToCart(item: PurchaseItemCreateUpdateRequest): void {
    const currentItems = this.getCartItems();
    const existingItemIndex = currentItems.findIndex(
      (i) => i.bookId === item.bookId
    );

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
      currentItems[existingItemIndex].price = item.price;
    } else {
      currentItems.push(item);
    }

    this.saveCartItems(currentItems);
  }

  removeFromCart(bookId: number): void {
    const currentItems = this.getCartItems().filter(
      (item) => item.bookId !== bookId
    );
    this.saveCartItems(currentItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  private saveCartItems(items: PurchaseItemCreateUpdateRequest[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  getCartTotal(): number {
    const items = this.getCartItems();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
