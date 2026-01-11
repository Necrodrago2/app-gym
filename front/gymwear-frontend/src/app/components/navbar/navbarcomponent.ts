import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Importaciones ajustadas a tus nombres de archivo reales (sin puntos extra)
import { UserService } from '../../services/userservice';
import { CartService } from '../../services/cartservice';
import { User } from '../../models/models';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbarcomponent.html',
    styleUrls: ['./navbarcomponent.scss']
})
export class NavbarComponent implements OnInit {
    currentUser: User | null = null;
    cartCount = 0;
    isMenuOpen = false;

    constructor(
        private userService: UserService,
        private cartService: CartService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Corrección del error TS7006: Definimos el tipo (user: User | null)
        this.userService.currentUser$.subscribe((user: User | null) => {
            this.currentUser = user;
        });

        this.cartService.cart$.subscribe(() => {
            this.cartCount = this.cartService.getCartCount();
        });
    }

    logout(): void {
        this.userService.logout();
        // El router devuelve una promesa, añadimos el catch por buena práctica
        this.router.navigate(['/']).catch(err => console.error(err));
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    isAdmin(): boolean {
        return this.userService.isAdmin();
    }
}