import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/models';
import { ProductService } from '../../../services/productservice';
import { CartService } from '../../../services/cartservice';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detailcomponent.html',
    styleUrls: ['./product-detailcomponent.scss']
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    quantity = 1;
    selectedSize = 'M';
    selectedColor = 'Negro';
    loading = true;

    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    colors = ['Negro', 'Blanco', 'Gris', 'Azul', 'Rojo'];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private cartService: CartService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.loadProduct(id);
        });
    }

    loadProduct(id: number): void {
        this.productService.getProductById(id).subscribe({
            next: (product) => {
                this.product = product;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar producto:', error);
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cargar el producto'
                });
            }
        });
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product, this.quantity, this.selectedSize, this.selectedColor);
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: `${this.product.name} agregado al carrito`
            });
        }
    }

    buyNow(): void {
        this.addToCart();
        this.router.navigate(['/cart']);
    }

    incrementQuantity(): void {
        this.quantity++;
    }

    decrementQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
}