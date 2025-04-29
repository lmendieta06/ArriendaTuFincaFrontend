import { Injectable } from '@angular/core';
import { TipoCalificacion } from '../../enums/tipo_calificacion';
import { Calificacion } from '../../models/calificacion.model';
import axios from 'axios';
import { environment } from '../../../environments/environment';

export interface CalificacionCreateDTO {
  propiedadId: number;
  puntuacion: number;
  comentario: string;
  tipoCalificacion: TipoCalificacion;
}

export interface CalificacionUpdateDTO {
  puntuacion: number;
  comentario: string;
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor() { }

  // Obtener una calificación por ID
  getCalificacionById(id: number): Promise<Calificacion> {
    return axios.get<Calificacion>(`${environment.apiUrl}/calificaciones/buscar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener calificación ${id}:`, error);
        throw error;
      });
  }

  // Obtener calificaciones por usuario
  getCalificacionesByUsuario(usuarioId: number): Promise<Calificacion[]> {
    return axios.get<Calificacion[]>(`${environment.apiUrl}/calificaciones/buscarPorUsuario/${usuarioId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener calificaciones del usuario ${usuarioId}:`, error);
        throw error;
      });
  }

  // Obtener calificaciones por propiedad
  getCalificacionesByPropiedad(propiedadId: number): Promise<Calificacion[]> {
    return axios.get<Calificacion[]>(`${environment.apiUrl}/calificaciones/buscarPorPropiedad/${propiedadId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener calificaciones de la propiedad ${propiedadId}:`, error);
        throw error;
      });
  }

  // Obtener calificaciones por tipo
  getCalificacionesByTipo(tipoCalificacion: TipoCalificacion): Promise<Calificacion[]> {
    return axios.get<Calificacion[]>(`${environment.apiUrl}/calificaciones/buscarPorTipo/${tipoCalificacion}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener calificaciones del tipo ${tipoCalificacion}:`, error);
        throw error;
      });
  }

  // Obtener promedio de puntuación por propiedad
  getPromedioPuntuacionPropiedad(propiedadId: number): Promise<number> {
    return axios.get<number>(`${environment.apiUrl}/calificaciones/promedioPorPropiedad/${propiedadId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener promedio de puntuación de la propiedad ${propiedadId}:`, error);
        throw error;
      });
  }

  // Obtener promedio de puntuación por usuario y tipo de calificación
  getPromedioPuntuacionUsuario(usuarioId: number, tipoCalificacion: TipoCalificacion): Promise<number> {
    return axios.get<number>(`${environment.apiUrl}/calificaciones/promedioPorUsuario/${usuarioId}/${tipoCalificacion}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener promedio de puntuación del usuario ${usuarioId} como ${tipoCalificacion}:`, error);
        throw error;
      });
  }

  // Crear una nueva calificación
  createCalificacion(usuarioId: number, calificacion: CalificacionCreateDTO): Promise<Calificacion> {
    return axios.post<Calificacion>(`${environment.apiUrl}/calificaciones/registrar/${usuarioId}`, calificacion)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al crear calificación:', error);
        throw error;
      });
  }

  // Actualizar una calificación
  updateCalificacion(id: number, calificacion: CalificacionUpdateDTO): Promise<Calificacion> {
    return axios.put<Calificacion>(`${environment.apiUrl}/calificaciones/actualizar/${id}`, calificacion)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al actualizar calificación ${id}:`, error);
        throw error;
      });
  }

  // Eliminar (soft delete) una calificación
  deleteCalificacion(id: number): Promise<void> {
    return axios.delete(`${environment.apiUrl}/calificaciones/eliminar/${id}`)
      .then(() => {
        return;
      })
      .catch(error => {
        console.error(`Error al eliminar calificación ${id}:`, error);
        throw error;
      });
  }

  // Reactivar una calificación
  reactivarCalificacion(id: number): Promise<Calificacion> {
    return axios.put<Calificacion>(`${environment.apiUrl}/calificaciones/reactivar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al reactivar calificación ${id}:`, error);
        throw error;
      });
  }
}
