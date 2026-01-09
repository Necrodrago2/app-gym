import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Category } from '../../../models/models';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    categories: Category[] = [];
    selectedCategory: Category | null = null;
    loading = true;
    searchTerm = '';
    sortKey = '';

    sortOptions = [
        { label: 'Precio: Menor a Mayor', value: 'price-asc' },
        { label: 'Precio: Mayor a Menor', value: 'price-desc' },
        { label: 'Nombre: A-Z', value: 'name-asc' },
        { label: 'Nombre: Z-A', value: 'name-desc' }
    ];

    layout: 'grid' | 'list' = 'grid';

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
    }

    loadProducts(): void {
        this.productService.getAllProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar productos:', error);
                this.loading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los productos'
                });
            }
        });
    }

    loadCategories(): void {
        this.productService.getAllCategories().subscribe({
            next: (categories) => {
                this.categories = categories;
            },
            error: (error) => {
                console.error('Error al cargar categorías:', error);
            }
        });
    }

    filterByCategory(category: Category | null): void {
        this.selectedCategory = category;
        this.applyFilters();
    }

    onSearch(): void {
        this.applyFilters();
    }

    applyFilters(): void {
        let filtered = [...this.products];

        // Filtrar por categoría
        if (this.selectedCategory) {
            filtered = filtered.filter(p => p.category.id === this.selectedCategory!.id);
        }

        // Filtrar por búsqueda
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
            );
        }

        this.filteredProducts = filtered;
        this.applySort();
    }

    onSortChange(event: any): void {
        this.sortKey = event.value;
        this.applySort();
    }

    applySort(): void {
        if (!this.sortKey) return;

        switch (this.sortKey) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case 'name-asc':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
    }

    addToCart(product: Product): void {
        this.cartService.addToCart(product, 1);
        this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: `${product.name} agregado al carrito`
        });
    }

    viewProduct(product: Product): void {
        this.router.navigate(['/products', product.id]);
    }

    getSeverity(product: Product): string {
        return product.active ? 'success' : 'danger';
    }
}