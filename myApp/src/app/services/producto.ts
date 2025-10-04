import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api = inject(ApiService);

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.api.get('productos') as Observable<Producto[]>;
  }

  // Registrar un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.api.post('productos', producto) as Observable<Producto>;
  }

  // Actualizar un producto existente
  updateProducto(id: number, producto: Producto): Observable<Producto> {
    return this.api.put(`productos/${id}`, producto) as Observable<Producto>;
  }

  // Eliminar un producto
  deleteProducto(id: number): Observable<any> {
    return this.api.delete(`productos/${id}`) as Observable<any>;
  }
}

