import { Component } from '@angular/core';
import { PropiedadCardComponent } from '../../components/propiedad-card/propiedad-card.component';
import { NavArrendatarioComponent } from '../../components/nav-arrendatario/nav-arrendatario.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mis-propiedades-arrendatario',
  standalone: true,
  imports: [CommonModule, HeaderArrendatarioComponent, NavArrendatarioComponent, PropiedadCardComponent],
  templateUrl: './mis-propiedades-arrendatario.component.html',
  styleUrl: './mis-propiedades-arrendatario.component.css'
})
export class MisPropiedadesArrendatarioComponent {
  properties = [
    {
      name: 'Finca El Paraíso',
      location: 'Santa Elena, Medellín, Antioquia',
      price: 350000,
      description: 'Hermosa finca con vista panorámica a las montañas, piscina, zonas verdes y espacios recreativos. Ideal para eventos familiares y descanso.',
      capacity: 15,
      rating: 4.9,
      reservations: 8,
      status: 'Disponible',
      amenities: ['15 personas', 'Piscina'],
      imageNumber: 1
    },
    {
      name: 'Finca Los Rosales',
      location: 'La Calera, Cundinamarca',
      price: 280000,
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana en familia.',
      capacity: 10,
      rating: 4.7,
      reservations: 5,
      status: 'No Disponible',
      amenities: ['10 personas', 'BBQ'],
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      location: 'La Calera, Cundinamarca',
      price: 280000,
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana en familia.',
      capacity: 10,
      rating: 4.7,
      reservations: 5,
      status: 'No Disponible',
      amenities: ['10 personas', 'BBQ'],
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      location: 'La Calera, Cundinamarca',
      price: 280000,
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana en familia.',
      capacity: 10,
      rating: 4.7,
      reservations: 5,
      status: 'No Disponible',
      amenities: ['10 personas', 'BBQ'],
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      location: 'La Calera, Cundinamarca',
      price: 280000,
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana en familia.',
      capacity: 10,
      rating: 4.7,
      reservations: 5,
      status: 'No Disponible',
      amenities: ['10 personas', 'BBQ'],
      imageNumber: 2
    }
  ];
  
  // Estadísticas generales
  stats = {
    totalProperties: 5,
    availableProperties: 3,
    unavailableProperties: 2,
    averageRating: 4.8
  };
  
  // Métodos para filtrar y buscar propiedades
  searchProperties(term: string) {
    // Implementación de búsqueda
    console.log(`Búsqueda por término: ${term}`);
  }
  
  filterByStatus(status: string) {
    // Implementación de filtro por estado
    console.log(`Filtro por estado: ${status}`);
  }
  
  filterByDepartment(department: string) {
    // Implementación de filtro por departamento
    console.log(`Filtro por departamento: ${department}`);
  }
  
  addNewProperty() {
    // Lógica para añadir nueva propiedad
    console.log('Añadir nueva propiedad');
  }
}
