import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Propiedad } from '../../models/propiedad.model';
import { Solicitud } from '../../models/solicitud.model';
import { Calificacion } from '../../models/calificacion.model';
import axios from 'axios';

export interface PropiedadSimple {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precioPorDia: number;
  disponible: boolean;
  imagen: string;
}
export interface PropiedadDetalle extends Propiedad {
  activo: boolean;
  solicitudes: Solicitud[];
  calificaciones: Calificacion[];
  imagen: string;
  calificacionPromedio:number;
}

export interface PropiedadCreateDTO {
  nombre: string;
  descripcion: string;
  ubicacion: string;
  precioPorDia: number;
  disponible: boolean;
  capacidad: number;
  caracteristicas: string;
  direccion: string;
  ciudad: string;
  departamento: string;
  imagen: string;
}

export interface PropiedadUpdateDTO {
  nombre: string;
  descripcion: string;
  precioPorDia: number;
  disponible: boolean;
  capacidad: number;
  caracteristicas: string;
}
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor() { }

  // Obtener todas las propiedades
  getAllPropiedades(): Promise<PropiedadSimple[]> {
    return axios.get<PropiedadSimple[]>(`${environment.apiUrl}/propiedades/listar`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener propiedades:', error);
        throw error;
      });
  }

  // Obtener propiedad por ID
  getPropiedadById(id: number): Promise<Propiedad> {
    return axios.get<Propiedad>(`${environment.apiUrl}/propiedades/buscar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener propiedad con ID ${id}:`, error);
        throw error;
      });
  }

  // Obtener detalle de propiedad por ID
  getPropiedadDetalleById(id: number): Promise<PropiedadDetalle> {
    return axios.get<PropiedadDetalle>(`${environment.apiUrl}/propiedades/detalle/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener detalle de propiedad con ID ${id}:`, error);
        throw error;
      });
  }

  // Obtener propiedades por arrendatario
  getPropiedadesByArrendatario(arrendatarioId: number): Promise<PropiedadDetalle[]> {
    return axios.get<PropiedadDetalle[]>(`${environment.apiUrl}/propiedades/buscarPorArrendatario/${arrendatarioId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener propiedades del arrendatario ${arrendatarioId}:`, error);
        throw error;
      });
  }

  // Obtener propiedades disponibles
  getPropiedadesDisponibles(): Promise<PropiedadSimple[]> {
    return axios.get<PropiedadSimple[]>(`${environment.apiUrl}/propiedades/listarDisponibles`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al obtener propiedades disponibles:', error);
        throw error;
      });
  }

  // Obtener propiedades por ubicación
  getPropiedadesByUbicacion(ubicacion: string): Promise<PropiedadSimple[]> {
    return axios.get<PropiedadSimple[]>(`${environment.apiUrl}/propiedades/buscarPorUbicacion`, {
      params: { ubicacion }
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener propiedades por ubicación ${ubicacion}:`, error);
        throw error;
      });
  }

  // Obtener propiedades por ciudad
  getPropiedadesByCiudad(ciudad: string): Promise<PropiedadSimple[]> {
    return axios.get<PropiedadSimple[]>(`${environment.apiUrl}/propiedades/buscarPorCiudad/${ciudad}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener propiedades por ciudad ${ciudad}:`, error);
        throw error;
      });
  }

  // Obtener propiedades por departamento
  getPropiedadesByDepartamento(departamento: string): Promise<PropiedadSimple[]> {
    return axios.get<PropiedadSimple[]>(`${environment.apiUrl}/propiedades/buscarPorDepartamento/${departamento}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener propiedades por departamento ${departamento}:`, error);
        throw error;
      });
  }

  // Obtener calificación promedio de una propiedad
  getCalificacionPromedio(id: number): Promise<number> {
    return axios.get<number>(`${environment.apiUrl}/propiedades/calificacionPromedio/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al obtener calificación promedio de propiedad ${id}:`, error);
        throw error;
      });
  }

  // Crear una nueva propiedad
  createPropiedad(arrendatarioId: number, propiedad: PropiedadCreateDTO): Promise<Propiedad> {
    return axios.post<Propiedad>(`${environment.apiUrl}/propiedades/registrar/${arrendatarioId}`, propiedad)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error al crear propiedad:', error);
        throw error;
      });
  }

  // Actualizar una propiedad
  updatePropiedad(id: number, propiedad: PropiedadUpdateDTO): Promise<Propiedad> {
    return axios.put<Propiedad>(`${environment.apiUrl}/propiedades/actualizar/${id}`, propiedad)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al actualizar propiedad ${id}:`, error);
        throw error;
      });
  }

  // Eliminar (soft delete) una propiedad
  deletePropiedad(id: number): Promise<void> {
    return axios.delete(`${environment.apiUrl}/propiedades/eliminar/${id}`)
      .then(response => {
        return;
      })
      .catch(error => {
        console.error(`Error al eliminar propiedad ${id}:`, error);
        throw error;
      });
  }

  // Reactivar una propiedad
  reactivarPropiedad(id: number): Promise<Propiedad> {
    return axios.put<Propiedad>(`${environment.apiUrl}/propiedades/reactivar/${id}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(`Error al reactivar propiedad ${id}:`, error);
        throw error;
      });
  }
}
