// src/app/components/cliente-modal/cliente-modal.component.ts
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ClienteModalComponent implements OnInit {
  private clientesService = inject(ClientesService);
  private modalCtrl = inject(ModalController);

  @Input() cliente: Cliente | null = null;

  // Datos del formulario
  formData: Cliente = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };
  
  isLoading = false;
  errorMessage = '';
  esEdicion = false;

  ngOnInit() {
    if (this.cliente) {
      // Modo edición
      this.esEdicion = true;
      this.formData = { ...this.cliente };
    }
  }

  async guardarCliente() {
    // Validaciones básicas
    if (!this.formData.nombre.trim()) {
      this.errorMessage = 'El nombre es requerido';
      return;
    }

    if (!this.formData.email.trim()) {
      this.errorMessage = 'El email es requerido';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.esEdicion && this.cliente?.id) {
        // Actualizar cliente existente
        await this.clientesService.updateCliente(this.cliente.id, this.formData).toPromise();
        console.log('✅ Cliente actualizado');
      } else {
        // Crear nuevo cliente
        await this.clientesService.createCliente(this.formData).toPromise();
        console.log('✅ Cliente creado');
      }

      // Cerrar modal indicando que se guardó
      this.modalCtrl.dismiss({ guardado: true });
      
    } catch (error: any) {
      console.error('❌ Error guardando cliente:', error);
      this.isLoading = false;
      
      if (error.status === 422) {
        this.errorMessage = 'Datos inválidos o email duplicado';
      } else {
        this.errorMessage = 'Error al guardar el cliente';
      }
    }
  }

  cancelar() {
    this.modalCtrl.dismiss({ guardado: false });
  }
}