import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/orderservice';
import { Order } from '../../../models/models';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-admin-orders',
    templateUrl: './admin-orderscomponent.html',
    standalone: true,
    styleUrls: ['./admin-orderscomponent.scss']
})
export class AdminOrdersComponent implements OnInit {
    orders: Order[] = [];
    loading = true;
    selectedOrder: Order | null = null;
    displayDialog = false;

    statusOptions = [
        { label: 'Pendiente', value: 'pending', severity: 'warning' },
        { label: 'Procesando', value: 'processing', severity: 'info' },
        { label: 'Enviado', value: 'shipped', severity: 'primary' },
        { label: 'Entregado', value: 'delivered', severity: 'success' },
        { label: 'Cancelado', value: 'cancelled', severity: 'danger' }
    ];

    constructor(
        private orderService: OrderService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadOrders();
    }

    loadOrders(): void {
        this.loading = true;
        this.orderService.getAllOrders().subscribe({
            next: (orders) => {
                this.orders = orders;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar órdenes:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar las órdenes'
                });
                this.loading = false;
            }
        });
    }

    viewOrder(order: Order): void {
        this.selectedOrder = order;
        this.displayDialog = true;
    }

    updateOrderStatus(order: Order, newStatus: string): void {
        this.confirmationService.confirm({
            message: `¿Actualizar el estado de la orden #${order.id} a ${newStatus}?`,
            header: 'Confirmar Actualización',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // Aquí iría la lógica para actualizar el estado
                order.status = newStatus;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Estado actualizado correctamente'
                });
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
                window.URL.revokeObjectURL(url);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'PDF descargado correctamente'
                });
            },
            error: (error) => {
                console.error('Error:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo descargar el PDF'
                });
            }
        });
    }

    sendEmail(orderId: number): void {
        this.orderService.sendOrderEmail(orderId).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Email enviado correctamente'
                });
            },
            error: (error) => {
                console.error('Error:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo enviar el email'
                });
            }
        });
    }

    getStatusSeverity(status: string): string {
        const option = this.statusOptions.find(opt => opt.value === status);
        return option ? option.severity : 'info';
    }

    getStatusLabel(status: string): string {
        const option = this.statusOptions.find(opt => opt.value === status);
        return option ? option.label : status;
    }

    hideDialog(): void {
        this.displayDialog = false;
        this.selectedOrder = null;
    }
}

