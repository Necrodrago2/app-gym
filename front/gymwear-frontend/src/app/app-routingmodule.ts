import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/homecomponent';
import { ProductListComponent } from './components/products/product-list/product-listcomponent';
import { ProductDetailComponent } from './components/products/product-detail/product-detailcomponent';
import { CartComponent } from './components/cart/cartcomponent';
import { CheckoutComponent } from './components/checkout/checkoutcomponent';
import { UserProfileComponent } from './components/user/user-profile/user-profilecomponent';
import { LoginComponent } from './components/auth/login/logincomponent';
import { RegisterComponent } from './components/auth/register/registercomponent';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboardcomponent';
import { AdminProductsComponent } from './components/admin/admin-products/admin-productscomponent';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orderscomponent';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        children: [
            { path: 'products', component: AdminProductsComponent },
            { path: 'orders', component: AdminOrdersComponent },
            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }