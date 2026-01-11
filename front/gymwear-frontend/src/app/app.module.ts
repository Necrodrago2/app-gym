import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Routing
import { AppRoutingModule } from './app-routing.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { ChartModule } from 'primeng/chart';
import { TooltipModule } from 'primeng/tooltip';

// PrimeNG Services
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbarcomponent';
import { FooterComponent } from './components/footer/footercomponent';
import { HomeComponent } from './components/home/homecomponent';
import { ProductListComponent } from './components/products/product-list/product-listcomponent';
import { ProductDetailComponent } from './components/products/product-detail/product-detailcomponent';
import { CartComponent } from './components/cart/cartcomponent';
import { CheckoutComponent } from './components/checkout/checkoutcomponent';
import { LoginComponent } from './components/auth/login/logincomponent';
import { RegisterComponent } from './components/auth/register/registercomponent';
import { UserProfileComponent } from './components/user/user-profile/user-profilecomponent';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboardcomponent';
import { AdminProductsComponent } from './components/admin/admin-products/admin-productscomponent';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orderscomponent';

// Services
import { UserService } from './services/userservice';
import { CartService } from './services/cartservice';
import { ProductService } from './services/productservice';
import { OrderService } from './services/orderservice';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        ProductListComponent,
        ProductDetailComponent,
        CartComponent,
        CheckoutComponent,
        LoginComponent,
        RegisterComponent,
        AdminProductsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        
        // PrimeNG Modules
        ButtonModule,
        CardModule,
        InputTextModule,
        DropdownModule,
        TableModule,
        ToastModule,
        ConfirmDialogModule,
        DialogModule,
        TagModule,
        RatingModule,
        ProgressSpinnerModule,
        TabViewModule,
        DataViewModule,
        ChartModule,
        TooltipModule,
        
        // Angular Material Modules
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        
        // Standalone Components
        UserProfileComponent,
        AdminDashboardComponent,
        AdminOrdersComponent
    ],
    providers: [
        UserService,
        CartService,
        ProductService,
        OrderService,
        MessageService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }