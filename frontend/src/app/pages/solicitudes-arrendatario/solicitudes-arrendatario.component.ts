import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavArrendatarioComponent } from '../../components/nav-arrendatario/nav-arrendatario.component';
import { HeaderArrendatarioComponent } from '../../components/header-arrendatario/header-arrendatario.component';
import { SolicitudCardComponent } from '../../components/solicitud-card/solicitud-card.component';
import { SolicitudDetailsComponent } from '../../components/solicitud-details/solicitud-details.component';
import { SolicitudCalificacionComponent } from '../../components/solicitud-calificacion/solicitud-calificacion.component';
import { Solicitud } from '../../models/solicitud.model';
import { Usuario } from '../../models/usuario.model';
import { Propiedad } from '../../models/propiedad.model';
import { Pago } from '../../models/pago.model';
import { Calificacion } from '../../models/calificacion.model';
import { EstadoSolicitud } from '../../enums/estado_solicitud';
import { EstadoPago } from '../../enums/estado_pago';
import { MetodoPago } from '../../enums/metodo_pago';
import { TipoCalificacion } from '../../enums/tipo_calificacion';

@Component({
  selector: 'app-solicitudes-arrendatario',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    SolicitudCardComponent,
    SolicitudDetailsComponent,
    SolicitudCalificacionComponent
  ],
  templateUrl: './solicitudes-arrendatario.component.html',
  styleUrl: './solicitudes-arrendatario.component.css'
})
export class SolicitudesArrendatarioComponent implements OnInit {
  // Datos de solicitudes (versión mock)
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
      requestId: 'SOL-001',
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
      requestId: 'SOL-002',
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
      requestId: 'SOL-003',
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
      requestId: 'SOL-004',
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

  // Filtros
  filters = {
    property: 'all',
    status: 'all',
    startDate: '',
    endDate: ''
  };

  // Paginación
  currentPage = 1;
  totalPages = 5;
  itemsPerPage = 10;

  // Control de tabs
  activeTab = 'all';

  // Control de modales
  showDetailsModal = false;
  showReviewModal = false;
  selectedSolicitud!: Solicitud;
  selectedGuest!: Usuario;

  constructor() { }

  ngOnInit(): void {
    // En un caso real, aquí cargarías las solicitudes desde un servicio
  }

  // Método para filtrar solicitudes
  filterRequests(filters: any) {
    console.log('Aplicando filtros:', filters);
    // Aquí iría la lógica para filtrar las solicitudes según los criterios
    // Y luego actualizarías this.solicitudes con los resultados
  }

  // Método para cambiar de pestaña
  changeTab(tab: string) {
    this.activeTab = tab;
    console.log('Cambiando a pestaña:', tab);
    
    // Actualizar los filtros según la pestaña seleccionada
    if (tab !== 'all') {
      this.filters.status = tab;
      this.filterRequests(this.filters);
    } else {
      this.filters.status = 'all';
      this.filterRequests(this.filters);
    }
  }

  // Métodos para la paginación
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    // Aquí cargarías la página correspondiente
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Métodos para aprobar/rechazar solicitudes
  approveRequest(id: number) {
    console.log('Aprobando solicitud:', id);
    // Aquí iría la lógica para aprobar la solicitud y actualizar el backend
    this.closeDetailsModal();
    
    // Actualizar los contadores y la lista de solicitudes (ejemplo)
    this.stats.pending--;
    this.stats.approved++;
    // Actualizar la lista de solicitudes
  }

  rejectRequest(id: number) {
    console.log('Rechazando solicitud:', id);
    // Aquí iría la lógica para rechazar la solicitud y actualizar el backend
    this.closeDetailsModal();
    
    // Actualizar los contadores y la lista de solicitudes (ejemplo)
    this.stats.pending--;
    this.stats.rejected++;
    // Actualizar la lista de solicitudes
  }

  // Método para ver detalles de una solicitud
  viewDetails(requestId: string) {
    console.log('Viendo detalles de solicitud:', requestId);
    
    // Encontrar la solicitud seleccionada
    const solicitudCard = this.solicitudes.find(s => s.requestId === requestId);
    
    if (solicitudCard) {
      // En un caso real, aquí cargarías la solicitud completa desde el servicio
      // Por ahora, creamos una versión mock de la Solicitud
      this.mockSolicitudCompleta(solicitudCard);
      
      // Determinar qué modal mostrar según el estado
      if (solicitudCard.status === 'Completada') {
        this.showReviewModal = true;
      } else {
        this.showDetailsModal = true;
      }
    }
  }

  // Método para simular la carga de una solicitud completa
  private mockSolicitudCompleta(solicitudCard: any) {
    // Crear el usuario (arrendatario)
    const arrendatario = new Usuario(
      solicitudCard.guestName,
      solicitudCard.guestName.toLowerCase().replace(' ', '.') + '@gmail.com',
      '',
      '+57 320 123 4567'
    );
    
    // Crear la propiedad
    const propiedad = new Propiedad(
      parseInt(solicitudCard.propertyId.substring(1)), // Extraer el número de F1, F2, etc.
      solicitudCard.propertyName,
      'Hermosa finca con vista panorámica a las montañas, piscina, zonas verdes y espacios recreativos. Ideal para eventos familiares y descanso.',
      solicitudCard.propertyLocation,
      solicitudCard.totalAmount / 5, // Precio por día (aproximado)
      true,
      true,
      15,
      'Piscina, BBQ, Wifi, Parqueadero',
      'Km 5 vía principal',
      solicitudCard.propertyLocation.split(',')[0].trim(), // Ciudad
      solicitudCard.propertyLocation.split(',')[1].trim(), // Departamento
      new Usuario('Anfitrión Ejemplo', 'anfitrion@ejemplo.com'),
      [],
      []
    );
    
    // Convertir fechas de texto a objetos Date
    const fechaInicio = this.parseFecha(solicitudCard.checkIn);
    const fechaFin = this.parseFecha(solicitudCard.checkOut);
    

    // Crear objeto de pago si no es pendiente
    let pago = null;

    pago = new Pago(
      1, // ID del pago
      null as any, // Solicitud (se asignará después)
      solicitudCard.totalAmount,
      new Date(2025, 3, 10), // Fecha de pago (simulada)
      MetodoPago.TARJETA_CREDITO,
      'REF-' + Math.floor(Math.random() * 1000000).toString(),
      solicitudCard.status === 'Completada' ? EstadoPago.COMPLETADO : 
              solicitudCard.status === 'Aprobada' ? EstadoPago.PENDIENTE : 
              EstadoPago.RECHAZADO,
      true
    );
    if (solicitudCard.status !== 'Pendiente') {
      pago = new Pago(
        1, // ID del pago
        null as any, // Solicitud (se asignará después)
        solicitudCard.totalAmount,
        new Date(2025, 3, 10), // Fecha de pago (simulada)
        MetodoPago.TARJETA_CREDITO,
        'REF-' + Math.floor(Math.random() * 1000000).toString(),
        solicitudCard.status === 'Completada' ? EstadoPago.COMPLETADO : 
                solicitudCard.status === 'Aprobada' ? EstadoPago.PENDIENTE : 
                EstadoPago.RECHAZADO,
        true
      );
    }
    
    // Crear la solicitud
    this.selectedSolicitud = new Solicitud(
      parseInt(solicitudCard.requestId.split('-')[1]),
      propiedad,
      arrendatario,
      propiedad.arrendatario,
      fechaInicio,
      fechaFin,
      solicitudCard.totalAmount,
      solicitudCard.status as EstadoSolicitud,
      'Nos gustaría realizar una celebración familiar durante nuestra estadía. Somos 12 adultos y 3 niños. ¿Es posible organizar un servicio de BBQ para uno de los días? Agradecemos su pronta respuesta.',
      pago,
      true
    );
    
    // Asignar la solicitud al pago (referencia circular)
    if (pago) {
      pago.solicitud = this.selectedSolicitud;
    }
    
    // Guardar referencia al huésped para el modal de calificación
    this.selectedGuest = arrendatario;
  }
  
  // Método auxiliar para parsear fechas en formato "DD mes, YYYY"
  private parseFecha(fechaTexto: string): Date {
    const partes = fechaTexto.split(' ');
    const dia = parseInt(partes[0]);
    const mes = this.getMesNumero(partes[1].replace(',', ''));
    const anio = parseInt(partes[2]);
    
    return new Date(anio, mes, dia);
  }
  
  // Método auxiliar para convertir nombre de mes a número
  private getMesNumero(mes: string): number {
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return meses.indexOf(mes.toLowerCase());
  }

  // Métodos para cerrar modales
  closeDetailsModal() {
    this.showDetailsModal = false;
  }

  closeReviewModal() {
    this.showReviewModal = false;
  }

  // Método para enviar una calificación
  submitReview(calificacion: Calificacion) {
    console.log('Calificación enviada:', calificacion);
    // Aquí iría la lógica para guardar la calificación en el backend
    this.closeReviewModal();
    // Mostrar mensaje de éxito
  }
}