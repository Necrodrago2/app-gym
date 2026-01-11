import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/productservice';
import { OrderService } from '../../../services/orderservice';
import { UserService } from '../../../services/userservice';

interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalUsers: number;
}

interface RecentOrder {
    id: number;
    date: string;
    customer: string;
    total: number;
    status: string;
}

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboardcomponent.html',
    standalone: true,
    styleUrls: ['./admin-dashboardcomponent.scss']
})
export class AdminDashboardComponent implements OnInit {
    stats: DashboardStats = {
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0
    };

    recentOrders: RecentOrder[] = [];
    loading = true;

    // Datos para gráficas
    salesData: any;
    salesOptions: any;

    ordersData: any;
    ordersOptions: any;

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadDashboardData();
        this.initializeCharts();
    }

    loadDashboardData(): void {
        this.loading = true;

        // Cargar productos
        this.productService.getAllProducts().subscribe({
            next: (products) => {
                this.stats.totalProducts = products.length;
                this.checkLoadingComplete();
            },
            error: (error) => {
                console.error('Error al cargar productos:', error);
                this.checkLoadingComplete();
            }
        });

        // Cargar órdenes
        this.orderService.getAllOrders().subscribe({
            next: (orders) => {
                this.stats.totalOrders = orders.length;
                this.stats.totalRevenue = orders.reduce((sum, order) =>
                    sum + (order.grandTotal || order.total), 0);

                // Obtener las últimas 5 órdenes
                this.recentOrders = orders
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map(order => ({
                        id: order.id!,
                        date: order.createdAt,
                        customer: `Usuario #${order.userId}`,
                        total: order.grandTotal || order.total,
                        status: order.status
                    }));

                this.checkLoadingComplete();
            },
            error: (error) => {
                console.error('Error al cargar órdenes:', error);
                this.checkLoadingComplete();
            }
        });

        // Cargar usuarios
        this.userService.getAllUsers().subscribe({
            next: (users) => {
                this.stats.totalUsers = users.length;
                this.checkLoadingComplete();
            },
            error: (error) => {
                console.error('Error al cargar usuarios:', error);
                this.checkLoadingComplete();
            }
        });
    }

    checkLoadingComplete(): void {
        // Verificar si todos los datos se han cargado
        if (this.stats.totalProducts >= 0 &&
            this.stats.totalOrders >= 0 &&
            this.stats.totalUsers >= 0) {
            this.loading = false;
        }
    }

    initializeCharts(): void {
        // Datos de ventas mensuales
        this.salesData = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Ventas 2024',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 27000, 35000, 38000, 42000],
                    fill: false,
                    borderColor: '#ff6b35',
                    backgroundColor: '#ff6b35',
                    tension: 0.4
                }
            ]
        };

        this.salesOptions = {
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Datos de órdenes por estado
        this.ordersData = {
            labels: ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'],
            datasets: [
                {
                    data: [15, 25, 20, 35, 5],
                    backgroundColor: [
                        '#ffd60a',
                        '#1a659e',
                        '#004e89',
                        '#06d6a0',
                        '#ef476f'
                    ]
                }
            ]
        };

        this.ordersOptions = {
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };
    }

    navigateToProducts(): void {
        this.router.navigate(['/admin/products']);
    }

    navigateToOrders(): void {
        this.router.navigate(['/admin/orders']);
    }

    viewOrder(orderId: number): void {
        this.router.navigate(['/admin/orders'], { queryParams: { id: orderId } });
    }

    getStatusSeverity(status: string): string {
        const severities: { [key: string]: string } = {
            'pending': 'warning',
            'processing': 'info',
            'shipped': 'primary',
            'delivered': 'success',
            'cancelled': 'danger'
        };
        return severities[status] || 'info';
    }

    getStatusLabel(status: string): string {
        const labels: { [key: string]: string } = {
            'pending': 'Pendiente',
            'processing': 'Procesando',
            'shipped': 'Enviado',
            'delivered': 'Entregado',
            'cancelled': 'Cancelado'
        };
        return labels[status] || status;
    }
}


