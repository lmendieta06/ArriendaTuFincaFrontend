import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FarmCardComponent } from '../../components/farm-card/farm-card.component';
import { LoginService } from '../../services/login_services/login.service';
import { PropertyService, PropiedadSimple } from '../../services/property-services/property.service';

@Component({
  selector: 'app-dashboard-arrendatario',
  standalone: true,
  imports: [CommonModule, RouterModule, FarmCardComponent],
  templateUrl: './dashboard-arrendatario.component.html',
  styleUrl: './dashboard-arrendatario.component.css'
})
export class DashboardArrendatarioComponent {
  userName: string = '';
  propiedades: PropiedadSimple[] = [];
  loading = true;
  error: string | null = null;
  activeProperties : number = 0;
  solicitudesPendientes : number = 0;
  arriendos:number = 0;
  calificacionPromedio : number = 4;

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
