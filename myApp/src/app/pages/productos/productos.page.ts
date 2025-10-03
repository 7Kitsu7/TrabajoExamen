import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItemSliding, IonItem, IonLabel, IonNote, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { create, trash, add } from 'ionicons/icons';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonNote,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonFab,
    IonFabButton,
  ]
})
export class ProductosPage implements OnInit {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService
  ) {
    addIcons({ create, trash, add });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
      }
    });
  }

}
