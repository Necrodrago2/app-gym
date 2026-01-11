import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartservice';
import { OrderService } from '../../services/orderservice';
import { UserService } from '../../services/userservice';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    checkoutForm: FormGroup;
    cartTotal = 0;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private cartService: CartService,
        private orderService: OrderService,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.checkoutForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            zipCode: ['', Validators.required],
            paymentMethod: ['card', Validators.required]
        });
    }

    ngOnInit(): void {
        this.cartTotal = this.cartService.getCartTotal();
        const user = this.userService.getCurrentUser();
        if (user) {
            this.checkoutForm.patchValue({
                name: user.name,
                email: user.email,
                phone: user.phone || ''
            });
        }
    }

    onSubmit(): void {
        if (this.checkoutForm.valid) {
            this.loading = true;
            // Simulación de procesamiento de orden
            setTimeout(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Orden procesada exitosamente'
                });
                this.cartService.clearCart();
                this.router.navigate(['/']);
                this.loading = false;
            }, 2000);
        }
    }
}