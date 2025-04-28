import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FarmCardComponent } from '../../components/farm-card/farm-card.component';

@Component({
  selector: 'app-dashboard-arrendatario',
  standalone: true,
  imports: [CommonModule, RouterModule, FarmCardComponent],
  templateUrl: './dashboard-arrendatario.component.html',
  styleUrl: './dashboard-arrendatario.component.css'
})
export class DashboardArrendatarioComponent {
  propiedades = [
    {
      name: 'Finca El Paraíso',
      description: 'Hermosa finca con vista panorámica a las montañas, piscina, zonas verdes y capacidad para 15 personas. Ideal para eventos familiares.',
      status: 'Disponible',
      imageNumber: 1
    },
    {
      name: 'Finca Los Rosales',
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana.',
      status: 'Disponible',
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana.',
      status: 'Disponible',
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana.',
      status: 'Disponible',
      imageNumber: 2
    },
    {
      name: 'Finca Los Rosales',
      description: 'Acogedora finca con jardines, zona de BBQ y espacios recreativos. Perfecta para escapadas de fin de semana.',
      status: 'Disponible',
      imageNumber: 2
    }
  ];

  stats = {
    propiedadesActivas: 3,
    solicitudesPendientes: 2,
    arriendosCompletados: 5,
    calificacionPromedio: 4.8
  };
}
