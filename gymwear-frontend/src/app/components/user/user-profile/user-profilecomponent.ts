import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userservice';
import { OrderService } from '../../../services/orderservice';
import { User, Order } from '../../../models/models';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profilecomponent.html',
    styleUrls: ['./user-profilecomponent.scss']
})
export class UserProfileComponent implements OnInit {
    user: User | null = null;
    orders: Order[] = [];
    loading = true;

    constructor(
        private userService: UserService,
        private orderService: OrderService
    ) {}

    ngOnInit(): void {
        this.user = this.userService.getCurrentUser();
        this.loadOrders();
    }

    loadOrders(): void {
        this.orderService.getAllOrders().subscribe({
            next: (orders) => {
                this.orders = orders;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar órdenes:', error);
                this.loading = false;
            }
        });
    }

    downloadPdf(orderId: number): void {
        this.orderService.downloadOrderPdf(orderId).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `orden-${orderId}.pdf`;
                link.click();
            }
        });
    }
}