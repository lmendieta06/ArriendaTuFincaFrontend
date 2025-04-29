import { Component } from '@angular/core';
import { PropiedadCardComponent } from '../../components/propiedad-card/propiedad-card.component';
import { NavArrendatarioComponent } from '../../components/nav-arrendatario/nav-arrendatario.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login_services/login.service';
import { PropertyService, PropiedadDetalle } from '../../services/property-services/property.service';
@Component({
  selector: 'app-mis-propiedades-arrendatario',
  standalone: true,
  imports: [CommonModule, HeaderArrendatarioComponent, NavArrendatarioComponent, PropiedadCardComponent],
  templateUrl: './mis-propiedades-arrendatario.component.html',
  styleUrl: './mis-propiedades-arrendatario.component.css'
})
export class MisPropiedadesArrendatarioComponent {
  properties:PropiedadDetalle[] = [];
  loading = true;
  error: string | null = null;
  totalProperties: number = 5;
  availableProperties: number = 3;
  unavailableProperties: number = 2;
  averageRating: number = 4.8;

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
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error al cargar mis propiedades:', error);
        this.error = 'No se pudieron cargar sus propiedades. Por favor, intente de nuevo más tarde.';
        this.loading = false;
      });
  }

}
