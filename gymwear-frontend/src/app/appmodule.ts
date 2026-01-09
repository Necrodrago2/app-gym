import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routingmodule';

import { AppComponent } from './appcomponent';
import { NavbarComponent } from './components/navbar/navbarcomponent';

import { UserService } from './services/userservice';
import { CartService } from './services/cartservice';
import { ProductService } from './services/productservice';
import { OrderService } from './services/orderservice';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        CartService,
        ProductService,
        OrderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }