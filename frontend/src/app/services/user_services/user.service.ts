import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import axios from 'axios';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers():Promise<Usuario[]>{
    return axios.get<Usuario[]>(`${environment.apiUrl}/usuarios/listar`)
    .then(response => {
      return response.data;
    })

    .catch(error => {
      console.error('Error al obtener usuarios:', error);
      throw error;
    });
  }
  
}
