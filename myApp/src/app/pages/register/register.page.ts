// src/app/pages/register/register.page.ts - VERSIÓN SEGURA
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegisterPage {
  private apiService = inject(ApiService);
  private router = inject(Router);

  usuario = {
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  fieldErrors: any = {};

  register() {
    // Reset errores
    this.errorMessage = '';
    this.fieldErrors = {};

    // Validaciones frontend
    if (this.usuario.password !== this.usuario.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.usuario.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      return;
    }

    this.isLoading = true;
    this.successMessage = '';

    const datosRegistro = {
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      password: this.usuario.password
    };

    // ✅ LOG SEGURO - Sin mostrar contraseña
    console.log('📝 Registrando usuario:', { 
      nombre: datosRegistro.nombre, 
      email: datosRegistro.email,
      password: '***' // Contraseña oculta
    });

    this.apiService.post('register', datosRegistro).subscribe({
      next: (response: any) => {
        // ✅ LOG SEGURO - Sin datos sensibles
        console.log('✅ Registro exitoso - Usuario creado ID:', response.usuario?.id);
        this.isLoading = false;
        this.successMessage = '¡Cuenta creada exitosamente! Redirigiendo...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        // ✅ LOG SEGURO - Solo información de diagnóstico
        console.error('❌ Error en registro - Status:', error.status);
        this.isLoading = false;

        if (error.status === 422) {
          const validationErrors = error.error.errors;
          console.log('🔍 Errores de validación detectados'); // Sin mostrar detalles sensibles
          
          if (validationErrors) {
            this.fieldErrors = validationErrors;
            
            const firstError = Object.values(validationErrors)[0];
            if (Array.isArray(firstError)) {
              this.errorMessage = firstError[0];
            }
          } else {
            this.errorMessage = 'Datos de registro inválidos';
          }
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión con el servidor';
        } else {
          this.errorMessage = 'Error del servidor';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearFieldError(fieldName: string) {
    if (this.fieldErrors[fieldName]) {
      delete this.fieldErrors[fieldName];
    }
  }
}