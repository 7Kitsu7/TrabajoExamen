// src/app/pages/clientes/clientes.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteModalComponent } from '../../components/cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ClientesPage implements OnInit {
  private clientesService = inject(ClientesService);
  private modalCtrl = inject(ModalController);
  private alertCtrl = inject(AlertController);
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
      error: (error: any) => {
        console.error('❌ Error cargando clientes:', error);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los clientes';

        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  // ABRIR MODAL PARA CREAR/EDITAR CLIENTE
  async abrirModalCliente(cliente?: Cliente) {
    const modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      componentProps: {
        cliente: cliente || null
      },
      breakpoints: [0, 0.8, 1], // Responsive para móvil
      initialBreakpoint: 0.8 // Ideal para móvil
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.guardado) {
        this.cargarClientes(); // Recargar lista si se guardó
      }
    });

    await modal.present();
  }

  // ELIMINAR CLIENTE CON ALERTA DE CONFIRMACIÓN
  async eliminarCliente(cliente: Cliente) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de eliminar a "${cliente.nombre}"?`, // ← Sin <strong>
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmarEliminacion(cliente);
          }
        }
      ]
    });

    await alert.present();
  }

  private async confirmarEliminacion(cliente: Cliente) {
    try {
      await this.clientesService.deleteCliente(cliente.id!).toPromise();
      console.log('✅ Cliente eliminado');
      this.cargarClientes();

      // Mostrar toast de éxito (opcional)
      const toast = document.createElement('ion-toast');
      toast.message = `Cliente ${cliente.nombre} eliminado`;
      toast.duration = 2000;
      toast.color = 'success';
      document.body.appendChild(toast);
      await toast.present();

    } catch (error: any) {
      console.error('❌ Error eliminando cliente:', error);

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo eliminar el cliente',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}