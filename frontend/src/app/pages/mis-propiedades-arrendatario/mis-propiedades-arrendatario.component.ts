import { Component } from '@angular/core';
import { PropiedadCardComponent } from '../../components/propiedad-card/propiedad-card.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login_services/login.service';
import { PropertyService, PropiedadDetalle } from '../../services/property-services/property.service';
import { CrearPropiedadComponent } from '../../components/crear-propiedad/crear-propiedad.component';
import { UpdatePropiedadComponent } from '../../components/update-propiedad/update-propiedad.component';
@Component({
  selector: 'app-mis-propiedades-arrendatario',
  standalone: true,
  imports: [CommonModule, PropiedadCardComponent, CrearPropiedadComponent, UpdatePropiedadComponent],
  templateUrl: './mis-propiedades-arrendatario.component.html',
  styleUrl: './mis-propiedades-arrendatario.component.css'
})
export class MisPropiedadesArrendatarioComponent {
  properties: PropiedadDetalle[] = [];
  loading = true;
  error: string | null = null;
  totalProperties: number = 0;
  availableProperties: number = 0;
  unavailableProperties: number = 0;
  averageRating: number = 0;
  showCreateModal: boolean = false;
  showEditModal = false;
  propiedadSeleccionada!: PropiedadDetalle;
  
  constructor(private loginService: LoginService, private propiedadService:PropertyService) { }

  ngOnInit(): void {
    
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
        this.properties = propiedades;
        this.totalProperties = this.properties.length;
        
        // Calcular propiedades disponibles y no disponibles
        this.availableProperties = this.properties.filter(p => p.disponible).length;
        this.unavailableProperties = this.properties.filter(p => !p.disponible).length;
        
        // Calcular calificación promedio
        if (this.properties.length > 0) {
          const totalRating = this.properties.reduce((sum, prop) => 
            sum + (prop.calificacionPromedio || 0), 0);
          this.averageRating = this.properties.length > 0 ? 
            totalRating / this.properties.length : 0;
        }
        
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error al cargar mis propiedades:', error);
        this.error = 'No se pudieron cargar sus propiedades. Por favor, intente de nuevo más tarde.';
        this.loading = false;
      });
  }

  // Método para depuración
  logProperties(): void {
    if (this.properties && this.properties.length > 0) {
      console.log('Primera propiedad:', this.properties[0]);
      console.log('Estructura de propiedades:', JSON.stringify(this.properties[0], null, 2));
    } else {
      console.log('No hay propiedades para mostrar');
    }
  }

  abrirModalCrearPropiedad(): void {
    this.showCreateModal = true;
  }

  cerrarModalCrearPropiedad(): void {
    this.showCreateModal = false;
  }

  onPropiedadCreada(): void {
    this.cargarMisPropiedades();
  }

  abrirModalEditarPropiedad(propiedad: PropiedadDetalle): void {
    this.propiedadSeleccionada = { ...propiedad }; // copia por seguridad
    this.showEditModal = true;
  }
  
  cerrarModalEditarPropiedad(): void {
    this.showEditModal = false;
    this.propiedadSeleccionada;
  }
  
  onPropiedadActualizada(): void {
    this.cargarMisPropiedades();
  }

  desactivarPropiedad(id: number): void {
    if (confirm('¿Estás seguro de que deseas desactivar esta propiedad?')) {
      this.propiedadService.deletePropiedad(id)
        .then(() => {
          this.cargarMisPropiedades(); // recarga la lista después de desactivar
        })
        .catch(error => {
          console.error('Error al desactivar la propiedad:', error);
          alert('No se pudo desactivar la propiedad.');
        });
    }
  }
}