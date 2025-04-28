import { TipoUsuario } from "../enums/tipo_usuario";
import { Propiedad } from "./propiedad.model";
import { Solicitud } from "./solicitud.model";
import { Calificacion } from "./calificacion.model";

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public telefono?: string,
        public tipoUsuario?: TipoUsuario,
        public activo?: boolean,
        public propiedades?: Array<Propiedad>,
        public solicitudesRealizadas?: Array<Solicitud>, 
        public solicitudesRecibidas?: Array<Solicitud>,
        public calificaciones?: Array<Calificacion>
    ) {}
}
