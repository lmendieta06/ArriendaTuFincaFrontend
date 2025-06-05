import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { Solicitud } from '../../models/solicitud.model';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { SolicitudUpdateDTO } from '../../services/solicitud-services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pago } from '../../models/pago.model';
import e from 'express';

@Component({
  selector: 'app-solicitud-card-arrendador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card-arrendador.component.html',
  styleUrl: './solicitud-card-arrendador.component.css'
})
export class SolicitudCardArrendadorComponent {
  @Input() propertyName: string = '';
  @Input() guestInitials: string = '';
  @Input() guestName: string = '';
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  @Input() requestId: number = 0;
  @Input() status: EstadoSolicitud = EstadoSolicitud.PENDIENTE;
  @Input() totalAmount:number=0;
  EstadoSolicitud = EstadoSolicitud;
  propertyId:string='';
  propertyLocation:string='';
  showActions:boolean=false;
  solicitud: Solicitud | null = null;

   // Eventos
   @Output() verSolicitudEvent = new EventEmitter<number>();

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit():void {
    this.getData();
  }

  getData(): void {
    this.solicitudService.getSolicitudById(this.requestId)
      .then((data: Solicitud) => {
        this.solicitud = data;
        
        if (data.propiedad) {
          this.propertyId = data.propiedad.id.toString();
          this.propertyLocation = data.propiedad.ubicacion;
        }

        if(this.status === "PENDIENTE"){
          this.showActions = true;
        }
        
        this.totalAmount = data.montoTotal;
      })
      .catch(error => {
        console.error('Error al cargar detalles de solicitud:', error);
      });
  }

  // Método para obtener la clase CSS según el estado
  getStatusClass(): string {
    const statusLower = this.status.toLowerCase();
    if (statusLower === 'pendiente') {
      return 'status-pending';
    } else if (statusLower === 'aprobada') {
      return 'status-approved';
    } else if (statusLower === 'rechazada') {
      return 'status-rejected';
    } else if (statusLower === 'completada') {
      return 'status-completed';
    }
    return '';
  }

  updateEstadoSolicitud(estado : EstadoSolicitud): void {
    const data:SolicitudUpdateDTO = {
      estado:estado,
      comentarios:`Estado solicitud ha cambiado a ${estado}`
    }
    this.solicitudService.updateEstadoSolicitud(this.requestId, data)
    .then(() => {
      // Actualizar el estado local para reflejar el cambio
      this.status = estado;
      this.showActions = false;
      
      // Emitir evento para notificar al componente padre
      this.verSolicitudEvent.emit(this.requestId);
    })

    .catch(error => {
      console.error(`Error al actualizar estado a ${estado}:`, error);
    });
  }

  getButtonClass(): string {
    switch (this.status) {
      case 'APROBADA': return 'approve-btn';
      case 'RECHAZADA': return ''; // no mostrar botón si no corresponde
      case 'COMPLETADA': return 'complete-btn'; // o una clase nueva si quieres
      default: return 'details-btn';
    }
  }

  getActionButtonLabel(): string {
    switch (this.status) {
      case EstadoSolicitud.APROBADA:
        return 'Pagar';
      case EstadoSolicitud.COMPLETADA:
        return 'Calificar';
      case EstadoSolicitud.PENDIENTE:
        return 'Ver detalles';
      default:
        return ''; // En caso de RECHAZADA, ocultamos el botón
    }
  }

  get solicitudExpirada(): boolean {
    if (this.solicitud?.calificacionArrendatario || this.solicitud?.calificacionPropiedad) {
      return true; // Si ya hay calificaciones, está expirada
    }
    return false;
  }

  shouldShowActionButton(): boolean {
    return this.status !== EstadoSolicitud.RECHAZADA;
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    this.verSolicitudEvent.emit(this.requestId);
  }
  
}
