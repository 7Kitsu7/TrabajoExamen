// src/app/pages/clientes/clientes.page.ts - CORREGIR TIPOS
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ClientesPage implements OnInit {
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  clientes: Cliente[] = [];
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.isLoading = true;
    this.errorMessage = '';

    this.clientesService.getClientes().subscribe({
      next: (response: any) => {
        this.clientes = response;
        this.isLoading = false;
        console.log('✅ Clientes cargados:', this.clientes.length);
      },
      error: (error: any) => { // ← AGREGAR TIPO 'any'
        console.error('❌ Error cargando clientes:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los clientes';
        
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  crearCliente() {
    this.router.navigate(['/cliente-editar', 'nuevo']);
  }

  editarCliente(cliente: Cliente) {
    this.router.navigate(['/cliente-editar', cliente.id]);
  }

  async eliminarCliente(cliente: Cliente) {
    if (!confirm(`¿Estás seguro de eliminar a ${cliente.nombre}?`)) {
      return;
    }

    try {
      await this.clientesService.deleteCliente(cliente.id!).toPromise();
      console.log('✅ Cliente eliminado');
      this.cargarClientes();
    } catch (error: any) { // ← AGREGAR TIPO 'any'
      console.error('❌ Error eliminando cliente:', error);
      alert('Error al eliminar el cliente');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}