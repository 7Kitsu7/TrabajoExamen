// src/app/app.routes.ts - VERSIÓN ALTERNATIVA
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
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
    path: 'cliente-editar/:id',
    loadComponent: () => import('./pages/cliente-editar/cliente-editar.page').then(m => m.ClienteEditarPage)
  },
  {
    path: 'productos', 
    loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPage)
  },
  {
    path: 'cliente-editar',
    loadComponent: () => import('./pages/cliente-editar/cliente-editar.page').then( m => m.ClienteEditarPage)
  },
];