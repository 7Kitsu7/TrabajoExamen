// src/app/services/clientes.service.ts
import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiService = inject(ApiService);

  getClientes() {
    return this.apiService.get('clientes');
  }

  getCliente(id: number) {
    return this.apiService.get(`clientes/${id}`);
  }

  createCliente(cliente: Cliente) {
    return this.apiService.post('clientes', cliente);
  }

  updateCliente(id: number, cliente: Cliente) {
    return this.apiService.put(`clientes/${id}`, cliente);
  }

  deleteCliente(id: number) {
    return this.apiService.delete(`clientes/${id}`);
  }
}