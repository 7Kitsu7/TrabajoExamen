// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient); // ← USAR inject() con provideHttpClient()

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  get(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  post(endpoint: string, data: any) {
    console.log('🌐 Enviando POST a:', `${this.baseUrl}/${endpoint}`);
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { 
      headers: this.getHeaders() 
    });
  }
}