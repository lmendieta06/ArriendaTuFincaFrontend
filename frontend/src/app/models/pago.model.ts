import { Solicitud } from "./solicitud.model";
import { MetodoPago } from "../enums/metodo_pago";
import { EstadoPago } from "../enums/estado_pago";

export class Pago {
    constructor(
        public id: number,
        public solicitud: Solicitud,
        public monto: number,
        public fechaPago: Date,
        public metodoPago: MetodoPago,
        public referenciaPago: string,
        public estadoPago: EstadoPago,
        public activo: boolean = true
    ) {}
}



