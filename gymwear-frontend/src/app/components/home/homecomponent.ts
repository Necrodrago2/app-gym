import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/models';
import { ProductService } from '../../services/productservice';

@Component({
    selector: 'app-home',
    templateUrl: './homecomponent.html',
    styleUrls: ['./homecomponent.scss']
})
export class HomeComponent implements OnInit {
    featuredProducts: Product[] = [];
    loading = true;

    categories = [
        { name: 'Camisetas', icon: 'pi-shield', image: 'assets/categories/shirts.jpg' },
        { name: 'Pantalones', icon: 'pi-star', image: 'assets/categories/pants.jpg' },
        { name: 'Accesorios', icon: 'pi-briefcase', image: 'assets/categories/accessories.jpg' },
        { name: 'Calzado', icon: 'pi-directions', image: 'assets/categories/shoes.jpg' }
    ];

    responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    constructor(
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadFeaturedProducts();
    }

    loadFeaturedProducts(): void {
        this.productService.getAllProducts().subscribe({
            next: (products) => {
                this.featuredProducts = products.slice(0, 6);
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar productos:', error);
                this.loading = false;
            }
        });
    }

    navigateToProducts(): void {
        this.router.navigate(['/products']);
    }

    viewProduct(product: Product): void {
        this.router.navigate(['/products', product.id]);
    }
}