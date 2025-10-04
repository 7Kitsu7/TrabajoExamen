// src/app/app.routes.ts
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
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'clientes',
        loadComponent: () => import('./pages/clientes/clientes.page').then(m => m.ClientesPage)
      },
      {
        path: 'productos',
        loadComponent: () => import('./pages/productos/productos.page').then(m => m.ProductosPage)
      },
      {
        path: '',
        redirectTo: '/tabs/clientes',
        pathMatch: 'full'
      }
    ]
  },
  // Redirección para mantener compatibilidad con tus rutas actuales
  {
    path: 'clientes',
    redirectTo: 'tabs/clientes',
    pathMatch: 'full'
  },
  {
    path: 'productos', 
    redirectTo: 'tabs/productos',
    pathMatch: 'full'
  }
];