import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FarmCardComponent } from '../../components/farm-card/farm-card.component';
import { LoginService } from '../../services/login_services/login.service';
import { PropertyService, PropiedadDetalle, PropiedadSimple } from '../../services/property-services/property.service';

@Component({
  selector: 'app-dashboard-arrendatario',
  standalone: true,
  imports: [CommonModule, RouterModule, FarmCardComponent],
  templateUrl: './dashboard-arrendatario.component.html',
  styleUrl: './dashboard-arrendatario.component.css'
})
export class DashboardArrendatarioComponent {
  userName: string = '';
  propiedades: PropiedadDetalle[] = [];
  loading = true;
  error: string | null = null;
  activeProperties : number = 0;
  solicitudesPendientes : number = 0;
  arriendos:number = 0;
  calificacionPromedio : number = 0;

  constructor(private loginService: LoginService, private propiedadService:PropertyService) { }
  
  ngOnInit(): void {

    // Suscribirse a los cambios del usuario actual
    this.loginService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.nombre;
      } else {
        this.userName = '';
      }
    });
    
    this.cargarMisPropiedades();

  }

  cargarMisPropiedades(): void {
    this.loading = true;
    this.error = null;
    
    const userId = this.loginService.getUserId();
    if (!userId) {
      this.error = 'Debe iniciar sesión para ver sus propiedades.';
      this.loading = false;
      return;
    }

    this.propiedadService.getPropiedadesByArrendatario(userId)
      .then((propiedades) => {
        this.propiedades = propiedades;
        this.activeProperties = this.propiedades.length;
        this.loading = false;

        // Calcular la calificación promedio correctamente
        let sumCalificaciones = 0;
        let countCalificaciones = 0;

        // Usar for...of para iterar sobre los valores, no las propiedades
        for (const propiedad of this.propiedades) {
          sumCalificaciones += propiedad.calificacionPromedio;
          countCalificaciones++;
        
          // Contar solicitudes pendientes
          if (propiedad.solicitudes) {
            this.solicitudesPendientes += propiedad.solicitudes.filter(s => s.estado === 'PENDIENTE').length;
            this.arriendos += propiedad.solicitudes.filter(s => s.estado === 'APROBADA' || s.estado === 'COMPLETADA' ).length;
          }
        }

        this.calificacionPromedio = Number((sumCalificaciones / propiedades.length).toFixed(1));
        
      })
      .catch((error) => {
        console.error('Error al cargar mis propiedades:', error);
        this.error = 'No se pudieron cargar sus propiedades. Por favor, intente de nuevo más tarde.';
        this.loading = false;
      });
  }

  eliminarPropiedad(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta propiedad?')) {
      this.propiedadService.deletePropiedad(id)
        .then(() => {
          // Filtrar la propiedad eliminada o volver a cargar todas
          this.propiedades = this.propiedades.filter(p => p.id !== id);
        })
        .catch((error) => {
          console.error(`Error al eliminar propiedad ${id}:`, error);
          alert('No se pudo eliminar la propiedad. Por favor, intente de nuevo más tarde.');
        });
    }
  }
}
