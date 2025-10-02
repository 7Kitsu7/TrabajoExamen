// src/app/pages/login/login.page.ts
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
    
    console.log('🔐 Intentando login con API...');
    
    this.apiService.post('login', this.credentials).subscribe({
      next: (response: any) => {
        console.log('✅ Login exitoso:', response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.usuario));
        this.isLoading = false;
        this.router.navigate(['/clientes']);
      },
      error: (error) => {
        console.error('❌ Error login:', error);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión. Verifica que el backend esté ejecutándose en http://localhost:8000';
        } else if (error.status === 422) {
          this.errorMessage = 'Datos de formulario inválidos';
        } else {
          this.errorMessage = `Error: ${error.status} - ${error.message}`;
        }
        
        console.log('Detalles del error:', error);
      }
    });
  }
}