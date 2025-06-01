import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudCardArrendadorComponent } from '../../components/solicitud-card-arrendador/solicitud-card-arrendador.component';
import { SolicitudDetailsComponent } from '../../components/solicitud-details/solicitud-details.component';
import { SolicitudCalificacionComponent } from '../../components/solicitud-calificacion/solicitud-calificacion.component';
import { Solicitud } from '../../models/solicitud.model';
import { SolicitudService, SolicitudSimple } from '../../services/solicitud-services/solicitud.service';
import { LoginService } from '../../services/login_services/login.service';
import { EstadoSolicitud } from '../../enums/estado_solicitud';

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
    SolicitudDetailsComponent,
    SolicitudCalificacionComponent
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

  // Propiedades para el HTML
  activeTab: string = 'all';
  showDetailsModal: boolean = false;
  showReviewModal: boolean = false;
  selectedSolicitud: any = null;
  selectedGuest: any = null;
  
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


  /*ngOnInit(): void {
    this.loading = true;
    this.error = null;
    
    const userId = this.loginService.getUserId();
    if (!userId) {
      this.error = 'Debe iniciar sesión para ver sus solicitudes.';
      this.loading = false;
      return;
    }
    this.cargarSolicitudes(userId);
  }
  }*/

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
  } 

  getInitial(userName: string): string {
    if (userName && userName.length > 0) {
      return userName.charAt(0).toUpperCase();
    }
    return '';
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
      for(const solicitud of this.solicitudes) {
        if(solicitud.estado === EstadoSolicitud.PENDIENTE) {
          this.pendientes++;
        } else if(solicitud.estado === EstadoSolicitud.COMPLETADA) {
          this.completadas++;
        } else if(solicitud.estado === EstadoSolicitud.RECHAZADA) {
          this.rechazadas++;
        } else if(solicitud.estado === EstadoSolicitud.APROBADA) {
          this.aprobadas++;
        }
      }
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
      );
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



}