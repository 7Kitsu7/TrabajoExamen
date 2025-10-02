// src/app/app.routes.ts - VERSIÓN ALTERNATIVA
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) // ← Login como página principal
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'clientes',
    loadComponent: () => import('./pages/clientes/clientes.page').then(m => m.ClientesPage)
  },
  {
    path: 'productos', 
    loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPage)
  },
];