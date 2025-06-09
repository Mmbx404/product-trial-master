import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Product} from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems = this.cartItemsSubject.asObservable();
  private selectedProducts: Product[] = [];

  constructor() {
  }

  addToCart(product: Product) {
    this.selectedProducts.push(product);
    this.cartItemsSubject.next(this.selectedProducts)
  }

  removeFromCart(item: any) {
    const index = this.selectedProducts.findIndex(i => i === item);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
      this.cartItemsSubject.next(this.selectedProducts);
    }
  }

  updateQuantity(product: Product, delta: number) {
    const item = this.selectedProducts.find(i => i.id === product.id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(item);
      } else {
        this.cartItemsSubject.next(this.selectedProducts);
      }
    }
  }

  getItems(): Product[] {
    return [...this.selectedProducts];
  }

  clearCart() {
    this.selectedProducts = [];
    this.cartItemsSubject.next(this.selectedProducts);
  }
}
