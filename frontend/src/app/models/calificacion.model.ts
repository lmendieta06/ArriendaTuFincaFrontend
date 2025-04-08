import { TipoCalificacion } from "../enums/tipo_calificacion";
import { Usuario } from "./usuario.model";
import { Propiedad } from "./propiedad.model";

export class Calificacion {
    constructor(
        public id: number,
        public usuario: Usuario,
        public propiedad: Propiedad,
        public puntuacion: number,
        public comentario: string,
        public fechaCalificacion: Date,
        public tipoCalificacion: TipoCalificacion,
        public activo: boolean = true
    ) {}
}


