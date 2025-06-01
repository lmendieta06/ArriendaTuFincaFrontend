import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, PropiedadSimple } from '../../services/property-services/property.service';
import { Router } from '@angular/router';
import { FincaCardComponent } from '../../components/finca-card/finca-card.component';
import { LoginService } from '../../services/login_services/login.service';

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
  userName: string = '';
  propiedades: PropiedadSimple[] = [];
  showDetailsModal: boolean = false;
  selectedPropiedad: any = null;
  propiedadesOriginal: PropiedadSimple[] = [];
  selectedGuest: any = null;
  fechaInicio: string = '';
  fechaFin: string = '';
  solicitudEnviada: boolean = false;
  
  filtros = {
    nombre: '',
    ubicacion: '',
    personas: 0
  };

  ciudades: string[] = ['','Bogotá', 'Medellín', 'Cali'];
  constructor(private loginService: LoginService, private propertyService: PropertyService, private router: Router) { }

  
  ngOnInit(): void {

    // Suscribirse a los cambios del usuario actual
    this.loginService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.nombre;
      } else {
        this.userName = '';
      }
    });

    
    this.propertyService.getPropiedadesDisponibles()
    .then(data => {
      this.propiedades = data;
      this.propiedadesOriginal = [...data]; // copia para filtros
    })
    .catch(err => {
      console.error('Error al cargar propiedades:', err);
    });
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
    this.selectedPropiedad = this.propiedades.find(p => p.id === requestId);
    if (this.selectedPropiedad) {
      this.showDetailsModal = true;
    }
  }
  
  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedPropiedad = null;
  }

  solicitarArriendo() {
    // Lógica real de solicitud
    this.solicitudEnviada = true;
  }

  pagar() {
    // Redirige o procesa el pago
    alert('Redirigiendo a la pasarela de pago...');
  }

  
}
