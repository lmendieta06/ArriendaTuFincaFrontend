import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavArrendatarioComponent } from '../../components/nav-arrendatario/nav-arrendatario.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';
@Component({
  selector: 'app-solicitudes-arrendatario',
  standalone: true,
  imports: [CommonModule, NavArrendatarioComponent, HeaderArrendatarioComponent, SolicitudCardComponent],
  templateUrl: './solicitudes-arrendatario.component.html',
  styleUrl: './solicitudes-arrendatario.component.css'
})
export class SolicitudesArrendatarioComponent {
  solicitudes = [
    {
      propertyId: 'F1',
      propertyName: 'Finca El Paraíso',
      propertyLocation: 'Santa Elena, Medellín, Antioquia',
      guestInitials: 'CR',
      guestName: 'Carlos Rodríguez',
      checkIn: '10 mayo, 2025',
      checkOut: '15 mayo, 2025',
      totalAmount: 1750000,
      requestId: '#SOL-001',
      status: 'Pendiente',
      showActions: true
    },
    {
      propertyId: 'F2',
      propertyName: 'Finca Los Rosales',
      propertyLocation: 'La Calera, Cundinamarca',
      guestInitials: 'ML',
      guestName: 'María López',
      checkIn: '3 mayo, 2025',
      checkOut: '5 mayo, 2025',
      totalAmount: 560000,
      requestId: '#SOL-002',
      status: 'Aprobada',
      showActions: false
    },
    {
      propertyId: 'F3',
      propertyName: 'Hacienda Santa Clara',
      propertyLocation: 'San Jerónimo, Antioquia',
      guestInitials: 'JG',
      guestName: 'Juan Gómez',
      checkIn: '22 abril, 2025',
      checkOut: '24 abril, 2025',
      totalAmount: 1000000,
      requestId: '#SOL-003',
      status: 'Rechazada',
      showActions: false
    },
    {
      propertyId: 'F1',
      propertyName: 'Finca El Paraíso',
      propertyLocation: 'Santa Elena, Medellín, Antioquia',
      guestInitials: 'LT',
      guestName: 'Laura Torres',
      checkIn: '15 abril, 2025',
      checkOut: '18 abril, 2025',
      totalAmount: 1050000,
      requestId: '#SOL-004',
      status: 'Completada',
      showActions: false
    }
  ];

  // Estadísticas
  stats = {
    pending: 5,
    approved: 12,
    rejected: 3,
    completed: 28,
    total: 48
  };

  // Método para filtrar solicitudes
  filterRequests(filters: any) {
    console.log('Aplicando filtros:', filters);
    // Aquí iría la lógica para filtrar las solicitudes
  }

  // Método para cambiar de pestaña
  changeTab(tab: string) {
    console.log('Cambiando a pestaña:', tab);
    // Aquí iría la lógica para cambiar de pestaña
  }

  // Métodos para aprobar/rechazar solicitudes
  approveRequest(requestId: string) {
    console.log('Aprobando solicitud:', requestId);
    // Aquí iría la lógica para aprobar la solicitud
  }

  rejectRequest(requestId: string) {
    console.log('Rechazando solicitud:', requestId);
    // Aquí iría la lógica para rechazar la solicitud
  }

  // Método para ver detalles
  viewDetails(requestId: string) {
    console.log('Viendo detalles de solicitud:', requestId);
    // Aquí iría la lógica para ver los detalles
  }
}
