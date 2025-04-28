import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import axios from 'axios';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `http://localhost:8082/api/usuarios/registrar`;

  async createUsuario(usuario: any) {
    try {
      console.log('Intentando conectar a:', this.apiUrl);
      console.log('Datos a enviar:', usuario);
      
      // Configuración explícita de Axios
      const response = await axios.post(this.apiUrl, usuario, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // Aumentar el tiempo de espera a 10 segundos
      });
      
      return response.data;
    } catch (error) {
      console.error('Error detallado:', error);
      throw error;
    }
  }
}
