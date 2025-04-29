import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { Solicitud } from '../../models/solicitud.model';
import { Propiedad } from '../../models/propiedad.model';
import { Pago } from '../../models/pago.model';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { EstadoPago } from '../../enums/estado_pago';
import { MetodoPago } from '../../enums/metodo_pago';

@Component({
  selector: 'app-solicitud-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-details.component.html',
  styleUrl: './solicitud-details.component.css'
})
export class SolicitudDetailsComponent implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() solicitudId: number = 0;
  
  @Output() closeEvent = new EventEmitter<void>();
  @Output() approved = new EventEmitter<number>();
  @Output() rejected = new EventEmitter<number>();

  // Propiedades adaptadas para la vista
  property: {
    code: string;
    name: string;
    location: string;
    description: string;
    capacity: number;
    price: number;
    rating: number;
  } = {
    code: '',
    name: '',
    location: '',
    description: '',
    capacity: 0,
    price: 0,
    rating: 0
  };

  guest: {
    name: string;
    email: string;
    phone: string;
    memberSince: Date;
  } = {
    name: '',
    email: '',
    phone: '',
    memberSince: new Date()
  };

  reservation: {
    id: string;
    status: string;
    requestDate: Date;
    checkInDate: Date;
    checkOutDate: Date;
    duration: number;
    totalAmount: number;
    paymentStatus: string;
    paymentMethod?: string;
    paymentReference?: string;
    paymentDate?: Date;
    comments?: string;
  } = {
    id: '',
    status: '',
    requestDate: new Date(),
    checkInDate: new Date(),
    checkOutDate: new Date(),
    duration: 0,
    totalAmount: 0,
    paymentStatus: '',
    comments: ''
  };

  // Referencias a los modelos originales
  solicitud!: Solicitud;
  propiedad!: Propiedad;
  arrendatario!: Usuario;
  pago?: Pago;

  constructor() { }

  ngOnInit(): void {
    this.actualizarDatosVista();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['solicitud'] && changes['solicitud'].currentValue) || 
        (changes['visible'] && changes['visible'].currentValue)) {
      this.actualizarDatosVista();
    }
  }

  /**
   * Establece la solicitud y actualiza los datos para la vista
   */
  @Input()
  set solicitudData(solicitud: Solicitud) {
    if (solicitud) {
      this.solicitud = solicitud;
      this.propiedad = solicitud.propiedad;
      this.arrendatario = solicitud.arrendatario;
      this.pago = solicitud.pago;
      this.actualizarDatosVista();
    }
  }

  /**
   * Actualiza los datos formateados para la vista
   */
  private actualizarDatosVista(): void {
    if (!this.solicitud || !this.solicitud.propiedad || !this.solicitud.arrendatario) return;

    // Datos de la propiedad
    this.property = {
      code: this.getPropertyCode(this.solicitud.propiedad),
      name: this.solicitud.propiedad.nombre,
      location: this.getPropertyLocation(this.solicitud.propiedad),
      description: this.solicitud.propiedad.descripcion,
      capacity: this.solicitud.propiedad.capacidad,
      price: this.solicitud.propiedad.precioPorDia,
      rating: this.getPropertyRating(this.solicitud.propiedad)
    };

    // Datos del huésped
    this.guest = {
      name: this.solicitud.arrendatario.nombre,
      email: this.solicitud.arrendatario.email,
      phone: this.solicitud.arrendatario.telefono || '',
      memberSince: this.getMemberSince(this.solicitud.arrendatario)
    };

    // Datos del pago
    let paymentStatus = 'Pendiente';
    let paymentMethod = undefined;
    let paymentReference = undefined;
    let paymentDate = undefined;
    
    if (this.pago) {
      paymentStatus = this.pago.estadoPago;
      paymentMethod = this.pago.metodoPago;
      paymentReference = this.pago.referenciaPago;
      paymentDate = this.pago.fechaPago;
    }

    // Datos de la reserva
    this.reservation = {
      id: `SOL_${this.solicitud.id.toString().padStart(3, '0')}`,
      status: this.solicitud.estado,
      requestDate: new Date(), // Fecha actual por defecto
      checkInDate: this.solicitud.fechaInicio,
      checkOutDate: this.solicitud.fechaFin,
      duration: this.calculateDuration(this.solicitud.fechaInicio, this.solicitud.fechaFin),
      totalAmount: this.solicitud.montoTotal,
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      paymentReference: paymentReference,
      paymentDate: paymentDate,
      comments: this.solicitud.comentarios
    };
  }

  /**
   * Obtiene el código de la propiedad (F1, F2, etc.)
   */
  private getPropertyCode(propiedad: Propiedad): string {
    // Esta lógica puede variar según tus necesidades
    const tipoPropiedad = propiedad.nombre.startsWith('Finca') ? 'F' : 
                          propiedad.nombre.startsWith('Hacienda') ? 'H' : 'P';
    return `${tipoPropiedad}${propiedad.id}`;
  }

  /**
   * Obtiene la ubicación completa de la propiedad
   */
  private getPropertyLocation(propiedad: Propiedad): string {
    return `${propiedad.ciudad}, ${propiedad.departamento}`;
  }

  /**
   * Calcula la calificación promedio de la propiedad
   */
  private getPropertyRating(propiedad: Propiedad): number {
    if (!propiedad.calificaciones || propiedad.calificaciones.length === 0) {
      return 0;
    }
    
    const calificacionesActivas = propiedad.calificaciones.filter(c => c.activo);
    if (calificacionesActivas.length === 0) return 0;
    
    const sum = calificacionesActivas.reduce((acc, curr) => acc + curr.puntuacion, 0);
    return Number((sum / calificacionesActivas.length).toFixed(1));
  }

  /**
   * Obtiene la fecha desde la que el usuario es miembro
   * En un caso real, esta información vendría del usuario
   */
  private getMemberSince(usuario: Usuario): Date {
    // Simulamos una fecha para el ejemplo
    return new Date(2023, 9, 1); // Octubre 2023
  }

  /**
   * Calcula la duración en días entre fechas
   */
  private calculateDuration(fechaInicio: Date, fechaFin: Date): number {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Obtiene las iniciales del nombre
   */
  getInitials(name: string): string {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  /**
   * Cierra el modal
   */
  close(): void {
    this.visible = false;
    this.closeEvent.emit();
  }

  /**
   * Aprueba la solicitud
   */
  approveReservation(): void {
    this.approved.emit(this.solicitud.id);
    this.close();
  }

  /**
   * Rechaza la solicitud
   */
  rejectReservation(): void {
    this.rejected.emit(this.solicitud.id);
    this.close();
  }
}