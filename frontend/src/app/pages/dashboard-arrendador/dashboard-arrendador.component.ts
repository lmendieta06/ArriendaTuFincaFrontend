import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService, PropiedadSimple } from '../../services/property-services/property.service';
import { Router } from '@angular/router';
import { FincaCardComponent } from '../../components/finca-card/finca-card.component';

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
  propiedadesOriginal: PropiedadSimple[] = [];
  filtros = {
    nombre: '',
    ubicacion: '',
    personas: 0
  };

  ciudades: string[] = ['Bogotá', 'Medellín', 'Cali'];
  constructor(private propertyService: PropertyService, private router: Router) { }

  
  ngOnInit(): void {
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
  

  verDetalles(id: number): void {
      this.router.navigate(['/propiedad', id]);
  }
}

