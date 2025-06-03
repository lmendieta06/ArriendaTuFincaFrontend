import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { environment } from '../../../environments/environment';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/usuarios/registrar`;
  private axiosSinToken: AxiosInstance;

  constructor() {
    this.axiosSinToken = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async createUsuario(usuario: any) {
    try {
      console.log('Intentando conectar a:', this.apiUrl);
      console.log('Datos a enviar:', usuario);
      console.log("Headers:", this.axiosSinToken.defaults.headers);

      const response = await this.axiosSinToken.post(this.apiUrl, usuario);
      return response.data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }
}

