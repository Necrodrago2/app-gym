import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/productservice';
import { Product, Category } from '../../../models/models';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-productscomponent.html',
    styleUrls: ['./admin-productscomponent.scss']
})
export class AdminProductsComponent implements OnInit {
    products: Product[] = [];
    categories: Category[] = [];
    loading = true;

    // Dialog
    displayDialog = false;
    displayCategoryDialog = false;
    productForm: FormGroup;
    categoryForm: FormGroup;
    selectedProduct: Product | null = null;
    isEditMode = false;

    // Filtros
    searchTerm = '';
    selectedCategory: Category | null = null;

    constructor(
        private productService: ProductService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            basePrice: [0, [Validators.required, Validators.min(0)]],
            imageUrl: [''],
            categoryId: [null, Validators.required],
            active: [true],
            stock: [0, [Validators.required, Validators.min(0)]],
            brand: [''],
            material: ['']
        });

        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            imageUrl: [''],
            active: [true]
        });
    }

    ngOnInit(): void {
        this.loadProducts();
        this.loadCategories();
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getAllProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar productos:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los productos'
                });
                this.loading = false;
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

    openNewProductDialog(): void {
        this.isEditMode = false;
        this.selectedProduct = null;
        this.productForm.reset({ active: true, stock: 0, basePrice: 0 });
        this.displayDialog = true;
    }

    openEditProductDialog(product: Product): void {
        this.isEditMode = true;
        this.selectedProduct = product;
        this.productForm.patchValue({
            name: product.name,
            description: product.description,
            basePrice: product.basePrice,
            imageUrl: product.imageUrl,
            categoryId: product.category.id,
            active: product.active,
            stock: product.stock || 0,
            brand: product.brand || '',
            material: product.material || ''
        });
        this.displayDialog = true;
    }

    saveProduct(): void {
        if (this.productForm.valid) {
            const formValue = this.productForm.value;
            const category = this.categories.find(c => c.id === formValue.categoryId);

            if (!category) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Debe seleccionar una categoría válida'
                });
                return;
            }

            const productData: Product = {
                id: this.selectedProduct?.id || 0,
                name: formValue.name,
                description: formValue.description,
                basePrice: formValue.basePrice,
                price: formValue.basePrice,
                imageUrl: formValue.imageUrl,
                category: category,
                active: formValue.active,
                stock: formValue.stock,
                brand: formValue.brand,
                material: formValue.material
            };

            if (this.isEditMode && this.selectedProduct) {
                // Actualizar producto
                this.productService.updateProduct(this.selectedProduct.id, productData).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Producto actualizado correctamente'
                        });
                        this.loadProducts();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo actualizar el producto'
                        });
                    }
                });
            } else {
                // Crear nuevo producto
                this.productService.createProduct(productData).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Producto creado correctamente'
                        });
                        this.loadProducts();
                        this.hideDialog();
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo crear el producto'
                        });
                    }
                });
            }
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor complete todos los campos requeridos'
            });
        }
    }

    deleteProduct(product: Product): void {
        this.confirmationService.confirm({
            message: `¿Está seguro de que desea eliminar el producto "${product.name}"?`,
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProduct(product.id).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Éxito',
                            detail: 'Producto eliminado correctamente'
                        });
                        this.loadProducts();
                    },
                    error: (error) => {
                        console.error('Error:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo eliminar el producto'
                        });
                    }
                });
            }
        });
    }

    toggleProductStatus(product: Product): void {
        const updatedProduct = { ...product, active: !product.active };
        this.productService.updateProduct(product.id, updatedProduct).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: `Producto ${updatedProduct.active ? 'activado' : 'desactivado'} correctamente`
                });
                this.loadProducts();
            },
            error: (error) => {
                console.error('Error:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cambiar el estado del producto'
                });
            }
        });
    }

    openNewCategoryDialog(): void {
        this.categoryForm.reset({ active: true });
        this.displayCategoryDialog = true;
    }

    saveCategory(): void {
        if (this.categoryForm.valid) {
            const categoryData: Category = {
                id: 0,
                name: this.categoryForm.value.name,
                description: this.categoryForm.value.description,
                imageUrl: this.categoryForm.value.imageUrl,
                active: this.categoryForm.value.active
            };

            this.productService.createCategory(categoryData).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Categoría creada correctamente'
                    });
                    this.loadCategories();
                    this.hideCategoryDialog();
                },
                error: (error) => {
                    console.error('Error:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo crear la categoría'
                    });
                }
            });
        }
    }

    hideDialog(): void {
        this.displayDialog = false;
        this.selectedProduct = null;
        this.productForm.reset();
    }

    hideCategoryDialog(): void {
        this.displayCategoryDialog = false;
        this.categoryForm.reset();
    }

    getFilteredProducts(): Product[] {
        let filtered = [...this.products];

        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
            );
        }

        if (this.selectedCategory) {
            filtered = filtered.filter(p => p.category.id === this.selectedCategory!.id);
        }

        return filtered;
    }

    getStatusSeverity(active: boolean): string {
        return active ? 'success' : 'danger';
    }

    getStatusLabel(active: boolean): string {
        return active ? 'Activo' : 'Inactivo';
    }
}