import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartservice';
import { CartItem } from '../../models/models';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-cart',
    templateUrl: './cartcomponent.html',
    styleUrls: ['./cartcomponent.scss']
})
export class CartComponent implements OnInit {
    cartItems: CartItem[] = [];
    subtotal = 0;
    shipping = 10;
    tax = 0;
    total = 0;

    constructor(
        private cartService: CartService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart(): void {
        this.cartService.cart$.subscribe(() => {
            this.cartItems = this.cartService.getCartItems();
            this.calculateTotals();
        });
    }

    calculateTotals(): void {
        this.subtotal = this.cartService.getCartTotal();
        this.tax = this.subtotal * 0.16; // 16% IVA
        this.total = this.subtotal + this.shipping + this.tax;
    }

    updateQuantity(index: number, quantity: number): void {
        this.cartService.updateQuantity(index, quantity);
    }

    removeItem(index: number): void {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres eliminar este producto?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cartService.removeFromCart(index);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Eliminado',
                    detail: 'Producto eliminado del carrito'
                });
            }
        });
    }

    clearCart(): void {
        this.confirmationService.confirm({
            message: '¿Estás seguro de que quieres vaciar el carrito?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cartService.clearCart();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Carrito Vaciado',
                    detail: 'El carrito ha sido vaciado'
                });
            }
        });
    }

    proceedToCheckout(): void {
        if (this.cartItems.length > 0) {
            this.router.navigate(['/checkout']);
        }
    }

    continueShopping(): void {
        this.router.navigate(['/products']);
    }
}