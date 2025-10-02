// src/app/pages/login/login.page.ts - VERSIÓN SEGURA
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginPage {
  private apiService = inject(ApiService);
  private router = inject(Router);

  credentials = {
    email: 'demo@example.com',
    password: 'password123'
  };
  isLoading = false;
  errorMessage = '';

  login() {
    this.isLoading = true;
    this.errorMessage = '';
    
    // ✅ LOG SEGURO - Sin mostrar contraseña
    console.log('🔐 Intentando login para:', this.credentials.email);
    
    this.apiService.post('login', this.credentials).subscribe({
      next: (response: any) => {
        // ✅ LOG SEGURO - Sin token completo
        console.log('✅ Login exitoso - Usuario:', response.usuario?.nombre);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.usuario));
        this.isLoading = false;
        this.router.navigate(['/clientes']);
      },
      error: (error) => {
        // ✅ LOG SEGURO - Solo información de diagnóstico
        console.error('❌ Error en login - Status:', error.status);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión con el servidor';
        } else {
          this.errorMessage = 'Error del servidor';
        }
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}