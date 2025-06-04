import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, PropiedadSimple } from '../../services/property-services/property.service';
import { Router } from '@angular/router';
import { FincaCardComponent } from '../../components/finca-card/finca-card.component';
import { LoginService } from '../../services/login_services/login.service';
import { SolicitudCreateDTO, SolicitudService } from '../../services/solicitud-services/solicitud.service';
import { EstadoSolicitud } from '../../enums/estado_solicitud';

@Component({
  selector: 'app-dashboard-arrendador',
  standalone: true,
  imports: [
      CommonModule, 
      FormsModule,
      FincaCardComponent,
    ],
    templateUrl: './dashboard-arrendador.component.html',
    styleUrls: ['./dashboard-arrendador.component.css'],
})

export class DashboardArrendadorComponent  implements OnInit {
  userId: number = 0;
  userName: string = '';
  propiedades: PropiedadSimple[] = [];
  showDetailsModal: boolean = false;
  selectedPropiedad: any = null;
  propiedadesOriginal: PropiedadSimple[] = [];
  selectedGuest: any = null;
  fechaInicio: string = '';
  fechaFin: string = '';
  solicitudEnviada: boolean = false;
  solicitudesEnviadas: Set<number> = new Set();
  loading = true;
  error: string | null = null;
  capacidadSolicitada: number | null = null;

  
  filtros = {
    nombre: '',
    ubicacion: '',
    personas: 0
  };

  ciudades: string[] = ['','Bogotá', 'Medellín', 'Cali'];
  constructor(private loginService: LoginService, private solicitudService: SolicitudService, private propertyService: PropertyService, private router: Router) { }

  
  ngOnInit(): void {

    // Suscribirse a los cambios del usuario actual
    this.loginService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.nombre;
        this.userId = user.id;
      } else {
        this.userName = '';
        this.userId = -1;
      }
    });

    this.cargarPropiedadesFIltradas();
  }


  async cargarPropiedadesFIltradas():Promise <void>{
    this.loading = true;
    this.error = null;

    try {
      const [propiedades, solicitudes] = await Promise.all([
        this.propertyService.getPropiedadesDisponibles(),
        this.solicitudService.getSolicitudesByArrendador(this.userId)
      ]);

      // Definir estados válidos para excluir propiedades con solicitudes en estos estados
      const estadosFiltrar = new Set([
        EstadoSolicitud.PENDIENTE,
        EstadoSolicitud.APROBADA,
        EstadoSolicitud.COMPLETADA
      ]);

      // Extraer nombres de propiedades con solicitudes en los estados definidos
      const propiedadesConSolicitud = new Set(
        solicitudes
          .filter(s => estadosFiltrar.has(s.estado))
          .map(s => s.propiedadNombre)
      );

      // Filtrar las propiedades del arrendador
      this.propiedades = propiedades.filter(
        p => !propiedadesConSolicitud.has(p.nombre)
      );

    } catch (err) {
      console.error('Error al cargar propiedades o solicitudes:', err);
      this.error = 'Error al cargar las propiedades. Intente de nuevo.';
    }

      this.loading = false;
  }
  

  filtrarPropiedades() {
    this.propiedades = this.propiedadesOriginal.filter(propiedad => {
      const nombreMatch = this.filtros.nombre
        ? propiedad.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase())
        : true;
  
      const ubicacionMatch = this.filtros.ubicacion
        ? propiedad.ubicacion.toLowerCase().includes(this.filtros.ubicacion.toLowerCase())
        : true;
  
      const personasMatch = this.filtros.personas
        ? propiedad.capacidad >= this.filtros.personas
        : true;
  
      return nombreMatch && ubicacionMatch && personasMatch;
    });
  }
  
  buscar() {
    console.log('Buscando con filtros:', this.filtros);
    this.filtrarPropiedades();
  }
  

  viewDetails(requestId: number): void {
    if (this.solicitudesEnviadas.has(requestId)) {
      alert('Ya has enviado una solicitud para esta propiedad.');
      return; // No hace falta ni mostrar el modal
    }
  
    this.selectedPropiedad = this.propiedades.find(p => p.id === requestId);
    if (this.selectedPropiedad) {
      this.showDetailsModal = true;
    }
  }
  
  
  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedPropiedad = null;
    this.capacidadSolicitada = null;
  }


  solicitarArriendo(): void {
  if (!this.fechaInicio || !this.fechaFin || !this.capacidadSolicitada || this.capacidadSolicitada <= 0) {
    alert('Por favor, completa las fechas y la cantidad de personas que se hospedarán.');
    return;
  }

  if (this.selectedPropiedad) {
    this.solicitudService.verificarDisponibilidadFechas(this.selectedPropiedad.id, this.fechaInicio, this.fechaFin)
      .then(disponible => {
        if (disponible) {
          const solicitud: SolicitudCreateDTO = {
            propiedadId: this.selectedPropiedad.id,
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin,
            comentarios: `Solicitud para ${this.capacidadSolicitada} personas`
          };

          this.solicitudService.createSolicitud(this.userId, solicitud)
            .then(response => {
              console.log('Solicitud enviada con éxito', response);
              this.solicitudesEnviadas.add(this.selectedPropiedad.id);
              this.propiedades = this.propiedades.filter(p => p.id !== this.selectedPropiedad.id);
              this.closeDetailsModal();
              this.fechaInicio = '';
              this.fechaFin = '';
              this.capacidadSolicitada = null;
              this.solicitudEnviada = false;
            })
            .catch(error => {
              console.error('Error al enviar solicitud:', error);
              alert('Hubo un error al enviar la solicitud. Intenta nuevamente.');
            });
        } else {
          alert('Las fechas seleccionadas no están disponibles.');
        }
      })
      .catch(error => {
        console.error('Error al verificar disponibilidad de fechas:', error);
        alert('Error al verificar disponibilidad de fechas.');
      });
    }
  } 
}
