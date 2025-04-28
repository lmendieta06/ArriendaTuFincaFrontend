import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() propertyId: string = '';
  @Input() propertyName: string = '';
  @Input() propertyLocation: string = '';
  @Input() guestInitials: string = '';
  @Input() guestName: string = '';
  @Input() checkIn: string = '';
  @Input() checkOut: string = '';
  @Input() totalAmount: number = 0;
  @Input() requestId: string = '';
  @Input() status: string = 'Pendiente';
  @Input() showActions: boolean = false;

  // Método para obtener la clase CSS según el estado
  getStatusClass(): string {
    const statusLower = this.status.toLowerCase();
    if (statusLower === 'pendiente') {
      return 'status-pending';
    } else if (statusLower === 'aprobada') {
      return 'status-approved';
    } else if (statusLower === 'rechazada') {
      return 'status-rejected';
    } else if (statusLower === 'completada') {
      return 'status-completed';
    }
    return '';
  }
}
