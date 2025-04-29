import { Injectable } from '@angular/core';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { Solicitud } from '../../models/solicitud.model';
import axios from 'axios';
import { environment } from '../../../environments/environment';
export interface SolicitudCreateDTO {
  propiedadId: number;
  fechaInicio: string;
  fechaFin: string;
  comentarios: string;
}

export interface SolicitudSimple {
  id: number;
  propiedadNombre: string;
  arrendadorNombre: string;
  arrendatarioNombre: string;
  fechaInicio: string;
  fechaFin: string;
  estado: EstadoSolicitud;
}

export interface SolicitudUpdateDTO {
  estado: EstadoSolicitud;
  comentarios: string;
}

@Injectable({
  providedIn: 'root'
})

export class SolicitudService {

  constructor() { }  
  
  // Obtener todas las solicitudes
  getAllSolicitudes(): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/listar`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener solicitudes:', error);
        throw error;
      });
  }

  // Obtener solicitud por ID
  getSolicitudById(id: number): Promise<Solicitud> {
    return axios.get<Solicitud>(`${environment.apiUrl}/solicitudes/buscar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitud con ID ${id}:`, error);
        throw error;
      });
  }

  // Obtener solicitudes por arrendador
  getSolicitudesByArrendador(arrendadorId: number): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/buscarPorArrendador/${arrendadorId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitudes del arrendador ${arrendadorId}:`, error);
        throw error;
      });
  }

  // Obtener solicitudes por arrendatario
  getSolicitudesByArrendatario(arrendatarioId: number): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/buscarPorArrendatario/${arrendatarioId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitudes del arrendatario ${arrendatarioId}:`, error);
        throw error;
      });
  }

  // Obtener solicitudes por propiedad
  getSolicitudesByPropiedad(propiedadId: number): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/buscarPorPropiedad/${propiedadId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitudes de la propiedad ${propiedadId}:`, error);
        throw error;
      });
  }

  // Obtener solicitudes por estado
  getSolicitudesByEstado(estado: EstadoSolicitud): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/buscarPorEstado/${estado}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitudes con estado ${estado}:`, error);
        throw error;
      });
  }

  // Obtener solicitudes por propiedad y estado
  getSolicitudesByPropiedadAndEstado(propiedadId: number, estado: EstadoSolicitud): Promise<SolicitudSimple[]> {
    return axios.get<SolicitudSimple[]>(`${environment.apiUrl}/solicitudes/buscarPorPropiedadYEstado/${propiedadId}/${estado}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener solicitudes de la propiedad ${propiedadId} con estado ${estado}:`, error);
        throw error;
      });
  }

  // Verificar disponibilidad de fechas
  verificarDisponibilidadFechas(propiedadId: number, fechaInicio: string, fechaFin: string): Promise<boolean> {
    return axios.get<boolean>(`${environment.apiUrl}/solicitudes/verificarDisponibilidad`, {
      params: {
        propiedadId,
        fechaInicio,
        fechaFin
      }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al verificar disponibilidad de fechas para la propiedad ${propiedadId}:`, error);
        throw error;
      });
  }

  // Crear solicitud
  createSolicitud(arrendadorId: number, solicitud: SolicitudCreateDTO): Promise<Solicitud> {
    return axios.post<Solicitud>(`${environment.apiUrl}/solicitudes/registrar/${arrendadorId}`, solicitud)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al crear solicitud:', error);
        throw error;
      });
  }

  // Actualizar estado de solicitud
  updateEstadoSolicitud(id: number, solicitudUpdate: SolicitudUpdateDTO): Promise<Solicitud> {
    return axios.put<Solicitud>(`${environment.apiUrl}/solicitudes/actualizar/${id}`, solicitudUpdate)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al actualizar estado de solicitud ${id}:`, error);
        throw error;
      });
  }

  // Eliminar solicitud
  deleteSolicitud(id: number): Promise<void> {
    return axios.delete(`${environment.apiUrl}/solicitudes/eliminar/${id}`)
      .then(() => {
        return;
      })
      .catch(error => {
        console.error(`Error al eliminar solicitud ${id}:`, error);
        throw error;
      });
  }

  // Reactivar solicitud
  reactivarSolicitud(id: number): Promise<Solicitud> {
    return axios.put<Solicitud>(`${environment.apiUrl}/solicitudes/reactivar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al reactivar solicitud ${id}:`, error);
        throw error;
      });
  }
}