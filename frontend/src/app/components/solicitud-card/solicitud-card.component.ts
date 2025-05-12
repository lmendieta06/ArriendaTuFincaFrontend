import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudDetailsComponent } from '../solicitud-details/solicitud-details.component';
import { SolicitudCalificacionComponent } from '../solicitud-calificacion/solicitud-calificacion.component';
import { SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { Solicitud } from '../../models/solicitud.model';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { SolicitudUpdateDTO } from '../../services/solicitud-services/solicitud.service';
@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() propertyName: string = '';
  @Input() guestInitials: string = '';
  @Input() guestName: string = '';
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  @Input() requestId: number = 0;
  @Input() status: EstadoSolicitud = EstadoSolicitud.PENDIENTE;
  EstadoSolicitud = EstadoSolicitud;
  propertyId:string='';
  propertyLocation:string='';
  totalAmount:number=0;
  showActions:boolean=false;
  solicitud: Solicitud | null = null;

   // Eventos
   @Output() viewDetailsEvent = new EventEmitter<number>();
   @Output() approveRequestEvent = new EventEmitter<number>();
   @Output() rejectRequestEvent = new EventEmitter<number>();
   @Output() openReviewEvent = new EventEmitter<Solicitud>();
   @Output() openDetailsEvent = new EventEmitter<Solicitud>();
   
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

  // Event handlers
  viewDetails(event: Event): void {
    event.stopPropagation();
    this.viewDetailsEvent.emit(this.requestId);
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
      if (estado === EstadoSolicitud.APROBADA) {
        this.approveRequestEvent.emit(this.requestId);
      } else if (estado === EstadoSolicitud.RECHAZADA) {
        this.rejectRequestEvent.emit(this.requestId);
      }
    })
    .catch(error => {
      console.error(`Error al actualizar estado a ${estado}:`, error);
    });
  }

  onDetailsClick(): void {
    console.log("revisando detalles")
    if (!this.solicitud) return;
  
    if (this.solicitud.estado === 'COMPLETADA') {
      console.log("completada")
      this.openReviewEvent.emit(this.solicitud);
    } else {
      console.log("else")
      this.openDetailsEvent.emit(this.solicitud);
    }
  }

  approveRequest(event: Event): void {
    event.stopPropagation();
    this.updateEstadoSolicitud(EstadoSolicitud.APROBADA);
  }

  rejectRequest(event: Event): void {
    event.stopPropagation();
    this.updateEstadoSolicitud(EstadoSolicitud.RECHAZADA);
  }
}
