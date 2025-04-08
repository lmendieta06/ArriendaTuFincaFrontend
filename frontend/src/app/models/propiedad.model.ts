import { Calificacion } from "./calificacion.model";
import { Solicitud } from "./solicitud.model";
import { Usuario } from "./usuario.model";

export class Propiedad {
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public ubicacion: string,
        public precioPorDia: number,
        public disponible: boolean,
        public activo: boolean,
        public capacidad: number,
        public caracteristicas: string,
        public direccion: string,
        public ciudad: string,
        public departamento: string,
        public arrendatario: Usuario,
        public solicitudes: Array<Solicitud>,
        public calificaciones: Array<Calificacion>,
    ) {}
}
