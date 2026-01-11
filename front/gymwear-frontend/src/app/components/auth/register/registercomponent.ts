import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userservice';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-register',
    templateUrl: './registercomponent.html',
    styleUrls: ['./registercomponent.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
            validators: this.passwordMatchValidator
        });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            this.loading = true;
            const { name, email, phone, password } = this.registerForm.value;

            const newUser = {
                name,
                username: email.split('@')[0],
                email,
                phone,
                password,
                role: 'user'
            };

            // Simulación de registro
            setTimeout(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Registro Exitoso',
                    detail: 'Tu cuenta ha sido creada correctamente'
                });
                this.router.navigate(['/login']);
                this.loading = false;
            }, 1500);
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor completa todos los campos correctamente'
            });
        }
    }

    goToLogin(): void {
        this.router.navigate(['/login']);
    }
}
