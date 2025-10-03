import { HttpClient } from '@angular/common/http';
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

  getProductos(): Observable<Producto[]> {
    return this.api.get('productos') as Observable<Producto[]>;
  }
}

