import { EstadoSolicitud } from "../enums/estado_solicitud";
import { Usuario } from "./usuario.model";
import { Propiedad } from "./propiedad.model";
import { Pago } from "./pago.model";
export class Solicitud {
  calificacionPropiedad: any;
  calificacionArrendatario: any;
    constructor(
        public id: number,
        public propiedad: Propiedad,
        public arrendatario: Usuario,
        public arrendador: Usuario,
        public fechaInicio: Date,
        public fechaFin: Date,
        public montoTotal: number,
        public estado: EstadoSolicitud,
        public comentarios: string,
        public pago: Pago,
        public activo: boolean
    ) {}
}

