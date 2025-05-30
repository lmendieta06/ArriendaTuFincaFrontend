import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { Solicitud } from '../../models/solicitud.model';
import { Propiedad } from '../../models/propiedad.model';
import { Pago } from '../../models/pago.model';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { EstadoPago } from '../../enums/estado_pago';
import { MetodoPago } from '../../enums/metodo_pago';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';

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

  solicitud!: Solicitud;
  propiedad!: Propiedad;
  arrendador!: Usuario;
  arrendatario!: Usuario;
  pago?: Pago;

  property: any = {};
  guest: any = {};
  reservation: any = {};
  
  dataLoaded = false;
  errorMessage: string | null = null;

  constructor(private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    if (this.solicitudId > 0) {
      this.loadSolicitudData();
    } else if (this.solicitud) {
      this.actualizarDatosVista();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el ID de la solicitud, cargar nuevos datos
    if (changes['solicitudId'] && !changes['solicitudId'].firstChange && this.solicitudId > 0) {
      this.loadSolicitudData();
    }
    
    // Si se actualiza la solicitud directamente
    if (changes['solicitud'] && changes['solicitud'].currentValue) {
      this.actualizarDatosVista();
    }
    
    // Si cambia la visibilidad a true y tenemos un ID, cargar datos
    if (changes['visible'] && changes['visible'].currentValue === true && this.solicitudId > 0) {
      this.loadSolicitudData();
    }
  }

  /**
   * Carga los datos completos de la solicitud usando el ID
   */
  loadSolicitudData(): void {
    this.dataLoaded = false;
    this.errorMessage = null;
    
    this.solicitudService.getSolicitudById(this.solicitudId)
      .then((data: Solicitud) => {
        this.solicitud = data;
        if (data.propiedad) {
          this.propiedad = data.propiedad;
        }
        if (data.arrendador) {
          this.arrendador = data.arrendador;
        }
        if (data.arrendatario) {
          this.arrendatario = data.arrendatario;
        }
        if (data.pago) {
          this.pago = data.pago;
        }
        
        this.actualizarDatosVista();
        this.dataLoaded = true;
      })
      .catch(error => {
        console.error('Error al cargar detalles de solicitud:', error);
        this.errorMessage = 'No se pudo cargar la información de la solicitud.';
        this.dataLoaded = true; // Para mostrar el mensaje de error
      });
  }

  /**
   * Establece la solicitud y actualiza los datos para la vista
   */
  @Input()
  set solicitudData(solicitud: Solicitud) {
    if (solicitud) {
      this.solicitud = solicitud;
      this.solicitudId = solicitud.id;
      
      if (solicitud.propiedad) {
        this.propiedad = solicitud.propiedad;
      }
      if (solicitud.arrendador) {
        this.arrendador = solicitud.arrendador;
      }
      if (solicitud.arrendatario) {
        this.arrendatario = solicitud.arrendatario;
      }
      if (solicitud.pago) {
        this.pago = solicitud.pago;
      }
      
      this.actualizarDatosVista();
      this.dataLoaded = true;
    }
  }

  /**
   * Actualiza los datos formateados para la vista
   */
  private actualizarDatosVista(): void {
    if (!this.solicitud) {
      this.errorMessage = 'No hay datos de solicitud disponibles';
      return;
    }
    
    // Si no hay propiedad o usuario, intentar cargar completamente desde el servicio
    if (!this.propiedad || !this.arrendador || !this.arrendatario) {
      if (this.solicitudId > 0) {
        this.loadSolicitudData();
        return;
      } else {
        this.errorMessage = 'Datos de solicitud incompletos';
        return;
      }
    }

    // Datos de la propiedad
    this.property = {
      code: this.getPropertyCode(this.propiedad),
      name: this.propiedad.nombre,
      location: this.getPropertyLocation(this.propiedad),
      description: this.propiedad.descripcion,
      capacity: this.propiedad.capacidad || 'N/A',
      price: this.propiedad.precioPorDia,
      rating: this.getPropertyRating(this.propiedad)
    };

    // Datos del huésped (arrendador)
    this.guest = {
      name: this.arrendador.nombre,
      email: this.arrendador.email,
      phone: this.arrendador.telefono || '',
      memberSince: this.getMemberSince(this.arrendador)
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
    if (!propiedad || !propiedad.nombre) return 'P0';
    
    // Esta lógica puede variar según tus necesidades
    const tipoPropiedad = propiedad.nombre.startsWith('Finca') ? 'F' : 
                          propiedad.nombre.startsWith('Hacienda') ? 'H' : 'P';
    return `${tipoPropiedad}${propiedad.id}`;
  }

  /**
   * Obtiene la ubicación completa de la propiedad
   */
  private getPropertyLocation(propiedad: Propiedad): string {
    if (!propiedad) return 'Ubicación no disponible';
    
    if (propiedad.ciudad && propiedad.departamento) {
      return `${propiedad.ciudad}, ${propiedad.departamento}`;
    } else if (propiedad.ubicacion) {
      return propiedad.ubicacion;
    } else {
      return 'Ubicación no disponible';
    }
  }

  /**
   * Calcula la calificación promedio de la propiedad
   */
  private getPropertyRating(propiedad: Propiedad): number {
    if (!propiedad || !propiedad.calificaciones || propiedad.calificaciones.length === 0) {
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
    if (!fechaInicio || !fechaFin) return 0;
    
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