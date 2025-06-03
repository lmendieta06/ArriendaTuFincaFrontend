import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Pago } from '../../models/pago.model';

export interface PaymentCreateDTO {
  solicitudId: number;
  monto: number;
  metodoPago: string;  
  referenciaPago: string;
}

export interface PaymentUpdateDTO {
  monto?: number;
  metodoPago?: string;
  referenciaPago?: string;
  estadoPago?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() {}

  // Obtener un pago por ID
  getPagoById(id: number): Promise<Pago> {
    return axios.get<Pago>(`${environment.apiUrl}/pagos/buscar/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error al obtener pago ${id}:`, err);
        throw err;
      });
  }

  // Obtener pagos por usuario
  getPagosByUsuario(usuarioId: number): Promise<Pago[]> {
    return axios.get<Pago[]>(`${environment.apiUrl}/pagos/buscarPorUsuario/${usuarioId}`)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error al obtener pagos del usuario ${usuarioId}:`, err);
        throw err;
      });
  }

  // Crear nuevo pago
  createPago(pago: PaymentCreateDTO): Promise<Pago> {
    return axios.post<Pago>(`${environment.apiUrl}/pagos/registrar`, pago)
      .then(res => res.data)
      .catch(err => {
        console.error('Error al crear pago:', err);
        throw err;
      });
  }
  
  

  // Actualizar pago
  updatePago(id: number, pago: PaymentUpdateDTO): Promise<Pago> {
    return axios.put<Pago>(`${environment.apiUrl}/pagos/actualizar/${id}`, pago)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error al actualizar pago ${id}:`, err);
        throw err;
      });
  }

  // Eliminar (soft delete)
  deletePago(id: number): Promise<void> {
    return axios.delete(`${environment.apiUrl}/pagos/eliminar/${id}`)
      .then(() => {})
      .catch(err => {
        console.error(`Error al eliminar pago ${id}:`, err);
        throw err;
      });
  }

  // Reactivar pago
  reactivarPago(id: number): Promise<Pago> {
    return axios.put<Pago>(`${environment.apiUrl}/pagos/reactivar/${id}`)
      .then(res => res.data)
      .catch(err => {
        console.error(`Error al reactivar pago ${id}:`, err);
        throw err;
      });
  }
}