import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userservice';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './logincomponent.html',
    styleUrls: ['./logincomponent.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            const { email, password } = this.loginForm.value;

            // Simulación de login por ahora
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Inicio de sesión exitoso'
            });
            this.router.navigate(['/']);
            this.loading = false;
        }
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
}