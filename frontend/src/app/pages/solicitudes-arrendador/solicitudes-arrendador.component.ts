import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudCardArrendadorComponent } from '../../components/solicitud-card-arrendador/solicitud-card-arrendador.component';
import { SolicitudDetailsArrendadorComponent } from '../../components/solicitud-details-arrendador/solicitud-details-arrendador.component';
import { SolicitudPagosArrendadorComponent } from '../../components/solicitud-pagos-arrendador/solicitud-pagos-arrendador.component';
import { SolicitudCalificacionComponent } from '../../components/solicitud-calificacion/solicitud-calificacion.component';
import { Solicitud } from '../../models/solicitud.model';
import { SolicitudService, SolicitudSimple, SolicitudUpdateDTO } from '../../services/solicitud-services/solicitud.service';
import { LoginService } from '../../services/login_services/login.service';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { PaymentCreateDTO } from '../../services/payments-services/payments.service';
import { SolicitudCalificacionArrendadorComponent } from '../../components/solicitud-calificacion-arrendador/solicitud-calificacion-arrendador.component';

interface FilterOptions {
  property: string;
  status: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-solicitudes-arrendador',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SolicitudCardArrendadorComponent,
    SolicitudDetailsArrendadorComponent,
    SolicitudPagosArrendadorComponent,
    SolicitudCalificacionComponent, 
    SolicitudCalificacionArrendadorComponent
  ],
  templateUrl: './solicitudes-arrendador.component.html',
  styleUrl: './solicitudes-arrendador.component.css'
})

export class SolicitudesArrendadorComponent implements OnInit {
  solicitudes: any[] = []; // Usando any porque no está claro si es SolicitudSimple o diferente
  solicitudesFiltradas: any[] = [];
  loading = true;
  error: string | null = null;
  pendientes: number = 0;
  completadas: number = 0;
  totalAmount: number = 0;
  aprobadas: number = 0;
  rechazadas: number = 0;
  modalTipo: string = ''; // puede ser 'detalles', 'calificacion', etc.
  EstadoSolicitud = EstadoSolicitud;
  calificacionesRecibidas: number = 0; // Contador de calificaciones recibidas



  // Propiedades para el HTML
  activeTab: string = 'all';
  showDetailsModal: boolean = false;
  showPaymentModal: boolean = false;
  selectedSolicitud: any = null;
  selectedGuest: any = null;
  showCompletadaModal: boolean = false;

  // Filtros
  filters: FilterOptions = {
    property: 'all',
    status: 'all',
    startDate: '',
    endDate: ''
  };

  estado = ["","PENDIENTE", "APROBADA", "RECHAZADA", "COMPLETADA"];
  propiedad = ["","Lote", "Cabaña", "Finca", "Rancho"];


  constructor(
    private solicitudService: SolicitudService,
    private loginService: LoginService
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    
    const userId = this.loginService.getUserId();
    if (!userId) {
      this.error = 'Debe iniciar sesión para ver sus solicitudes.';
      this.loading = false;
      return;
    }
    this.cargarSolicitudes(userId);
  

  
      
    this.solicitudesFiltradas = [...this.solicitudes];
    this.loading = false;
    
    // Contadores
    this.actualizarContadores();
    /*
    this.loading = true;
    this.error = null;
    
    const userId = this.loginService.getUserId();
    if (!userId) {
      this.error = 'Debe iniciar sesión para ver sus solicitudes.';
      this.loading = false;
      return;
    }
    this.cargarSolicitudes(userId);*/
  } 

  getInitial(userName: string): string {
    if (userName && userName.length > 0) {
      return userName.charAt(0).toUpperCase();
    }
    return '';
  }

  private actualizarContadores(): void {
  this.pendientes = this.solicitudes.filter(s => s.estado === EstadoSolicitud.PENDIENTE).length;
  this.aprobadas = this.solicitudes.filter(s => s.estado === EstadoSolicitud.APROBADA).length;
  this.rechazadas = this.solicitudes.filter(s => s.estado === EstadoSolicitud.RECHAZADA).length;
  this.completadas = this.solicitudes.filter(s => s.estado === EstadoSolicitud.COMPLETADA).length;
}

  
  cargarSolicitudes(userId: number): void {
    this.solicitudService.getSolicitudesByArrendador(userId)
    .then((solicitudes) => {
      this.solicitudes = solicitudes;
      this.solicitudesFiltradas = [...solicitudes]; // Copia para filtrado
      this.loading = false;
      
      // Reiniciar contadores
      this.pendientes = 0;
      this.completadas = 0;
      this.aprobadas = 0;
      this.rechazadas = 0;
      
      // Contar por estado
      this.solicitudes.forEach(solicitud => {
        switch (solicitud.estado) {
          case EstadoSolicitud.PENDIENTE:
            this.pendientes++;
            break;
          case EstadoSolicitud.APROBADA:
            this.aprobadas++;
            break;
          case EstadoSolicitud.RECHAZADA:
            this.rechazadas++;
            break;
          case EstadoSolicitud.COMPLETADA:
            this.completadas++;
            break;
        }
      });
    })


    .catch((error) => {
      console.error('Error al cargar solicitudes del arrendador:', error);
      this.error = 'No se pudieron cargar sus solicitudes. Por favor, intente de nuevo más tarde.';
      this.loading = false;
    });
  }

  changeTab(type: string): void {
    this.activeTab = type;
    
    if(type === 'all') {
      this.solicitudesFiltradas = [...this.solicitudes];
    } else {
      let estadoFiltrado: EstadoSolicitud;
      
      switch(type) {
        case 'pending':
          estadoFiltrado = EstadoSolicitud.PENDIENTE;
          break;
        case 'approved':
          estadoFiltrado = EstadoSolicitud.APROBADA;
          break;
        case 'rejected':
          estadoFiltrado = EstadoSolicitud.RECHAZADA;
          break;
        case 'completed':
          estadoFiltrado = EstadoSolicitud.COMPLETADA;
          break;
        default:
          this.solicitudesFiltradas = [...this.solicitudes];
          return;
      }
      
      this.solicitudesFiltradas = this.solicitudes.filter(
        solicitud => solicitud.estado === estadoFiltrado
      ).sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime());;
    }
  }

  filterRequests(filters: FilterOptions): void {
    let filteredSolicitudes = [...this.solicitudes];
    
    // Filtrar por propiedad
    if (filters.property && filters.property !== 'all') {
      filteredSolicitudes = filteredSolicitudes.filter(
        s => s.propiedadNombre.toLowerCase().includes(filters.property.toLowerCase())
      );
    }
    
    // Filtrar por estado
    if (filters.status && filters.status !== 'all') {
      let estadoFiltrado: EstadoSolicitud;
      
      switch(filters.status) {
        case EstadoSolicitud.PENDIENTE:
          estadoFiltrado = EstadoSolicitud.PENDIENTE;
          break;
        case EstadoSolicitud.APROBADA:
          estadoFiltrado = EstadoSolicitud.APROBADA;
          break;
        case EstadoSolicitud.RECHAZADA:
          estadoFiltrado = EstadoSolicitud.RECHAZADA;
          break;
        case EstadoSolicitud.COMPLETADA:
          estadoFiltrado = EstadoSolicitud.COMPLETADA;
          break;
      }
      
      filteredSolicitudes = filteredSolicitudes.filter(
        s => s.estado === estadoFiltrado
      );
    }
    
    // Filtrar por fecha de inicio
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filteredSolicitudes = filteredSolicitudes.filter(s => {
        const solicitudDate = new Date(s.fechaInicio);
        return solicitudDate >= startDate;
      });
    }
    
    // Filtrar por fecha de fin
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      filteredSolicitudes = filteredSolicitudes.filter(s => {
        const solicitudDate = new Date(s.fechaFin);
        return solicitudDate <= endDate;
      });
    }
    
    this.solicitudesFiltradas = filteredSolicitudes;
  }

  buscarSolicitudes(): void {
    this.activeTab = 'all'; // Cambiar a la pestaña "Todas" al buscar
    this.filterRequests(this.filters);
  }

  resetFilters(): void {
    this.filters = {
      property: 'all',
      status: 'all',
      startDate: '',
      endDate: ''
    };
    this.solicitudesFiltradas = [...this.solicitudes];
  }


  abrirModalSegunEstado(requestId: number): void {
    console.log('Abrir modal para solicitud con ID:', requestId);
    
    const solicitud = this.solicitudesFiltradas.find(s => s.id === requestId);
    if(!solicitud) return;

    this.selectedSolicitud = solicitud;
    console.log(this.selectedSolicitud);
    this.selectedGuest = solicitud.arrendadorNombre;
    
    switch (solicitud.estado) {
      case EstadoSolicitud.PENDIENTE:
        this.modalTipo = 'detalles';
        this.showDetailsModal = true;
        break;
      case EstadoSolicitud.APROBADA:
        this.modalTipo = 'pago';
        this.showPaymentModal = true;
        break;
      case EstadoSolicitud.COMPLETADA:
        this.modalTipo = 'completada';
        this.showCompletadaModal = true;
        break;
        
      default:
        this.modalTipo = '';
        break;
    }
  }



  onPagoRealizado(pago: PaymentCreateDTO): void {
    console.log('Pago recibido en el padre:', pago);
    this.updateEstadoSolicitud(pago.solicitudId,EstadoSolicitud.COMPLETADA);
  }


  updateEstadoSolicitud(solicitudId: number, estado: EstadoSolicitud): void {
    const solicitud = this.solicitudesFiltradas.find(s => s.id === solicitudId);
    if (!solicitud) return;
  
    const data: SolicitudUpdateDTO = {
      estado: estado,
      comentarios: `Estado solicitud ha cambiado a ${estado}`
    };
  
    this.solicitudService.updateEstadoSolicitud(solicitudId, data)
      .then(() => {
        solicitud.estado = estado;
      })
      .catch(error => {
        console.error(`Error al actualizar estado a ${estado}:`, error);
      });
  }
  

  

  onCalificacionEnviada(resultado: any): void {
    console.log('Calificación enviada:', resultado);

    this.calificacionesRecibidas++;

    if (this.calificacionesRecibidas >= 2) {
      this.cerrarModal();
      this.calificacionesRecibidas = 0; // reset para futuros usos
    }
  }

  
  cerrarModal(): void {
    this.showPaymentModal = false;
    this.showDetailsModal = false;
    this.showCompletadaModal = false;
    this.modalTipo = '';
  }


}