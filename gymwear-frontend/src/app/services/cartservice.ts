import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    public cart$ = this.cartSubject.asObservable();

    constructor() {
        // Cargar carrito desde localStorage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cartItems = JSON.parse(storedCart);
            this.cartSubject.next(this.cartItems);
        }
    }

    addToCart(product: Product, quantity: number = 1, size?: string, color?: string): void {
        const existingItem = this.cartItems.find(item =>
            item.product.id === product.id &&
            item.size === size &&
            item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                product,
                quantity,
                size,
                color
            });
        }

        this.updateCart();
    }

    removeFromCart(index: number): void {
        this.cartItems.splice(index, 1);
        this.updateCart();
    }

    updateQuantity(index: number, quantity: number): void {
        if (quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.cartItems[index].quantity = quantity;
            this.updateCart();
        }
    }

    clearCart(): void {
        this.cartItems = [];
        this.updateCart();
    }

    getCartItems(): CartItem[] {
        return this.cartItems;
    }

    getCartCount(): number {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    getCartTotal(): number {
        return this.cartItems.reduce((total, item) =>
            total + (item.product.basePrice * item.quantity), 0
        );
    }

    private updateCart(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.cartSubject.next(this.cartItems);
    }
}